
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabase";

import type { SaunaModel } from "../utils/types/sauna_models";
import type { OptionGroups } from "../utils/types/option_groups";
import type { OptionValues } from "../utils/types/option_value";
import type { ModelOptionValues } from "../utils/types/model_option_values";

import LeafIcon from "../components/LeafIcon";
import {
  clearComparison,
  getComparisonIds,
  removeFromComparison,
  subscribeToComparison,
} from "../utils/compare";

import { LuX, LuArrowRight, LuPlus } from "react-icons/lu";
import { MdPeopleAlt } from "react-icons/md";
import { HiMiniCube } from "react-icons/hi2";
import { IoMdHome } from "react-icons/io";

type ComparisonColumn = {
  model: SaunaModel;
  options: Record<
    string,
    {
      group: OptionGroups;
      values: Array<{
        value: OptionValues;
        price: number;
      }>;
    }
  >;
};

export default function Comparasion() {
  const navigate = useNavigate();

  const [comparisonIds, setComparisonIds] = useState<string[]>([]);
  const [models, setModels] = useState<SaunaModel[]>([]);
  const [optionGroups, setOptionGroups] = useState<OptionGroups[]>([]);
  const [optionValues, setOptionValues] = useState<OptionValues[]>([]);
  const [modelOptionValues, setModelOptionValues] = useState<
    ModelOptionValues[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refreshComparison = () => {
      setComparisonIds(getComparisonIds());
    };

    refreshComparison();

    return subscribeToComparison(refreshComparison);
  }, []);

  useEffect(() => {
    const fetchComparisonData = async () => {
      if (comparisonIds.length === 0) {
        setModels([]);
        setOptionGroups([]);
        setOptionValues([]);
        setModelOptionValues([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const { data: modelsData, error: modelsError } = await supabase
          .from("sauna_models")
          .select("*")
          .in("id", comparisonIds);

        if (modelsError) {
          console.error("Comparison models error:", modelsError);
          return;
        }

        const orderedModels = comparisonIds
          .map((id) =>
            modelsData?.find((model) => model.id === id)
          )
          .filter(Boolean) as SaunaModel[];

        setModels(orderedModels);

        const { data: modelOptionsData, error: modelOptionsError } =
          await supabase
            .from("model_option_values")
            .select("*")
            .in("model_id", comparisonIds);

        if (modelOptionsError) {
          console.error(
            "Comparison model options error:",
            modelOptionsError
          );
          return;
        }

        setModelOptionValues(modelOptionsData || []);

        const optionValueIds = [
          ...new Set(
            (modelOptionsData || []).map(
              (item) => item.option_value_id
            )
          ),
        ];

        if (optionValueIds.length === 0) {
          setOptionValues([]);
          setOptionGroups([]);
          return;
        }

        const { data: valuesData, error: valuesError } =
          await supabase
            .from("option_values")
            .select("*")
            .in("id", optionValueIds);

        if (valuesError) {
          console.error(
            "Comparison option values error:",
            valuesError
          );
          return;
        }

        setOptionValues(valuesData || []);

        const groupIds = [
          ...new Set(
            (valuesData || []).map(
              (value) => value.option_group_id
            )
          ),
        ];

        if (groupIds.length === 0) {
          setOptionGroups([]);
          return;
        }

        const { data: groupsData, error: groupsError } =
          await supabase
            .from("option_groups")
            .select("*")
            .in("id", groupIds)
            .order("display_order", {
              ascending: true,
            });

        if (groupsError) {
          console.error(
            "Comparison option groups error:",
            groupsError
          );
          return;
        }

        setOptionGroups(groupsData || []);
      } catch (error) {
        console.error(
          "Failed to load comparison:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchComparisonData();
  }, [comparisonIds]);

  const comparisonColumns = useMemo<ComparisonColumn[]>(() => {
    return models.map((model) => {
      const modelOptionRows = modelOptionValues.filter(
        (item) => item.model_id === model.id
      );

      const grouped: ComparisonColumn["options"] = {};

      optionGroups.forEach((group) => {
        const valuesForGroup = modelOptionRows
          .map((modelOption) => {
            const value = optionValues.find(
              (item) =>
                item.id === modelOption.option_value_id &&
                item.option_group_id === group.id
            );

            if (!value) return null;

            return {
              value,
              price: Number(modelOption.price || 0),
            };
          })
          .filter(Boolean) as Array<{
          value: OptionValues;
          price: number;
        }>;

        if (valuesForGroup.length > 0) {
          grouped[group.id] = {
            group,
            values: valuesForGroup,
          };
        }
      });

      return {
        model,
        options: grouped,
      };
    });
  }, [
    models,
    optionGroups,
    optionValues,
    modelOptionValues,
  ]);

  const formatDimensions = (
    dimensions: string | null
  ) => {
    if (!dimensions) return "-";

    const [d, w, h] = dimensions.split("x");

    return `D ${d} × W ${w} × H ${h}`;
  };

  const getOptionPrice = (
    modelId: string,
    valueId: string
  ) => {
    const match = modelOptionValues.find(
      (item) =>
        item.model_id === modelId &&
        item.option_value_id === valueId
    );

    return Number(match?.price || 0);
  };

  const allGroupIds = useMemo(() => {
    return optionGroups
      .filter((group) =>
        comparisonColumns.some(
          (column) => column.options[group.id]
        )
      )
      .map((group) => group.id);
  }, [optionGroups, comparisonColumns]);

  if (!loading && comparisonIds.length === 0) {
    return (
      <section className="min-h-screen bg-[#EDE9DF] text-[#313C2B]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-[120px] pt-[180px] pb-[160px]">
          <div className="flex items-center gap-2 mb-8">
            <LeafIcon className="w-[12px] h-[12px]" />
            <span
              className="text-[16px]"
              style={{
                fontFamily:
                  "noah-bold, sans-serif",
              }}
            >
              compare our saunas.
            </span>
          </div>

          <h1
            className="text-[64px] leading-[0.95] max-w-[800px]"
            style={{
              fontFamily:
                "sogo-light, sans-serif",
            }}
          >
            Choose two saunas and see what suits you best.
          </h1>

          <p
            className="mt-8 max-w-[650px] text-[18px]"
            style={{
              fontFamily:
                "noah-regular, sans-serif",
            }}
          >
            Compare dimensions, capacity, prices,
            available options and features side by
            side.
          </p>

          <Link
            to="/saunas"
            className="inline-flex items-center gap-2 mt-12 px-6 py-3 rounded-[8px] bg-[#313C2B] text-[#F7F5F0] hover:bg-[#778658] transition-colors"
            style={{
              fontFamily:
                "noah-bold, sans-serif",
            }}
          >
            Explore saunas
            <LuArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#EDE9DF] text-[#313C2B]">
      <div className="max-w-[1500px] mx-auto px-6 md:px-16 xl:px-24 pt-[150px] pb-[140px]">
        {/* HEADER */}
        <div className="flex items-end justify-between gap-10 mb-14">
          <div>
            <div
              className="flex items-center gap-2 mb-6"
              style={{
                fontFamily:
                  "noah-bold, sans-serif",
              }}
            >
              <LeafIcon className="w-[12px] h-[12px]" />
              <span>compare our saunas.</span>
            </div>

            <h1
              className="text-[52px] md:text-[64px] leading-[0.95]"
              style={{
                fontFamily:
                  "sogo-light, sans-serif",
              }}
            >
              Find the one that's right for you.
            </h1>
          </div>

          <button
            type="button"
            onClick={() => {
              clearComparison();
              navigate("/series");
            }}
            className="flex items-center gap-2 px-4 py-2 border border-[#C6C0AF] rounded-[8px] hover:bg-[#313C2B] hover:text-white transition-colors cursor-pointer"
            style={{
              fontFamily:
                "noah-bold, sans-serif",
            }}
          >
            <LuX className="w-4 h-4" />
            Clear comparison
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[0, 1].map((item) => (
              <div
                key={item}
                className="h-[700px] rounded-[12px] bg-[#D8D4C9] animate-pulse"
              />
            ))}
          </div>
        ) : (
          <>
            {/* TWO MAIN COLUMNS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {comparisonColumns.map(
                (column) => (
                  <article
                    key={column.model.id}
                    className="bg-[#F7F5EF] rounded-[12px] overflow-hidden"
                  >
                    {/* IMAGE */}
                    <div className="relative h-[440px] bg-[#EDE9DD] flex items-center justify-center overflow-hidden">
                      <img
                        src={
                          column.model
                            .product_sheet_url ?? ""
                        }
                        alt={
                          column.model.model_name
                        }
                        className="w-full h-full object-contain p-10"
                        loading="eager"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeFromComparison(
                            column.model.id
                          )
                        }
                        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#F7F5EF]/90 border border-[#C6C0AF] flex items-center justify-center hover:bg-[#313C2B] hover:text-white transition-colors cursor-pointer"
                        aria-label={`Remove ${column.model.model_name}`}
                      >
                        <LuX className="w-5 h-5" />
                      </button>
                    </div>

                    {/* MODEL HEADER */}
                    <div className="p-8">
                      <div className="flex items-end justify-between gap-6">
                        <div>
                          <h2
                            className="text-[38px] leading-none"
                            style={{
                              fontFamily:
                                "sogo-light, sans-serif",
                            }}
                          >
                            {column.model.model_name}
                          </h2>

                          <p
                            className="mt-3 text-[16px] max-w-[500px]"
                            style={{
                              fontFamily:
                                "noah-regular, sans-serif",
                            }}
                          >
                            {
                              column.model
                                .model_description
                            }
                          </p>
                        </div>

                        <div
                          className="shrink-0 text-[28px]"
                          style={{
                            fontFamily:
                              "noah-bold, sans-serif",
                          }}
                        >
                          $
                          {Number(
                            column.model.price || 0
                          ).toLocaleString(
                            "en-US"
                          )}
                        </div>
                      </div>

                      <Link
                        to={`/sauna/${column.model.slug || column.model.model_name
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="inline-flex items-center gap-2 mt-7 px-5 py-3 rounded-[8px] border border-[#C6C0AF] hover:bg-[#313C2B] hover:text-white transition-colors"
                        style={{
                          fontFamily:
                            "noah-bold, sans-serif",
                        }}
                      >
                        Configure this sauna
                        <LuArrowRight className="w-4 h-4" />
                      </Link>
                    </div>

                    {/* BASIC SPECS */}
                    <div className="border-t border-[#C6C0AF]">
                      <div
                        className="px-8 py-5 text-[18px]"
                        style={{
                          fontFamily:
                            "noah-bold, sans-serif",
                        }}
                      >
                        Specifications
                      </div>

                      <div className="divide-y divide-[#C6C0AF]">
                        <div className="grid grid-cols-[1fr_auto] gap-4 px-8 py-4">
                          <span>Capacity</span>
                          <span className="font-semibold">
                            <MdPeopleAlt className="inline mr-2 text-[#778658]" />
                            {column.model.people}{" "}
                            people
                          </span>
                        </div>

                        <div className="grid grid-cols-[1fr_auto] gap-4 px-8 py-4">
                          <span>Area</span>
                          <span className="font-semibold">
                            <HiMiniCube className="inline mr-2 text-[#778658]" />
                            {column.model.area_m2}{" "}
                            m²
                          </span>
                        </div>

                        <div className="grid grid-cols-[1fr_auto] gap-4 px-8 py-4">
                          <span>Rooms</span>
                          <span className="font-semibold">
                            <IoMdHome className="inline mr-2 text-[#778658]" />
                            {column.model.rooms}
                          </span>
                        </div>

                        <div className="grid grid-cols-[1fr_auto] gap-4 px-8 py-4">
                          <span>Exterior</span>
                          <span className="font-semibold text-right">
                            {formatDimensions(
                              column.model
                                .exterior_mm
                            )}
                          </span>
                        </div>

                        <div className="grid grid-cols-[1fr_auto] gap-4 px-8 py-4">
                          <span>Interior</span>
                          <span className="font-semibold text-right">
                            {formatDimensions(
                              column.model
                                .interior_mm
                            )}
                          </span>
                        </div>

                        <div className="grid grid-cols-[1fr_auto] gap-4 px-8 py-4">
                          <span>Weight</span>
                          <span className="font-semibold">
                            {column.model.weight_kg
                              ? `${column.model.weight_kg} kg`
                              : "-"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* OPTIONS */}
                    <div className="border-t border-[#C6C0AF]">
                      <div
                        className="px-8 py-5 text-[18px]"
                        style={{
                          fontFamily:
                            "noah-bold, sans-serif",
                        }}
                      >
                        Available options
                      </div>

                      <div className="px-8 pb-8 space-y-5">
                        {allGroupIds.map(
                          (groupId) => {
                            const groupData =
                              column.options[
                                groupId
                              ];

                            const group =
                              optionGroups.find(
                                (item) =>
                                  item.id ===
                                  groupId
                              );

                            if (!group) {
                              return null;
                            }

                            return (
                              <div
                                key={groupId}
                                className="border-b border-[#C6C0AF] pb-5 last:border-b-0"
                              >
                                <div
                                  className="text-[15px] mb-3"
                                  style={{
                                    fontFamily:
                                      "noah-bold, sans-serif",
                                  }}
                                >
                                  {group.name}
                                </div>

                                {groupData ? (
                                  <div className="flex flex-wrap gap-2">
                                    {groupData.values.map(
                                      ({
                                        value,
                                        price,
                                      }) => (
                                        <div
                                          key={
                                            value.id
                                          }
                                          className="px-3 py-2 rounded-[8px] border border-[#C6C0AF] bg-[#EDE9DF] text-[14px]"
                                        >
                                          <span
                                            style={{
                                              fontFamily:
                                                "noah-bold, sans-serif",
                                            }}
                                          >
                                            {
                                              value.name
                                            }
                                          </span>

                                          {price > 0 && (
                                            <span
                                              className="ml-2 opacity-70"
                                              style={{
                                                fontFamily:
                                                  "noah-regular, sans-serif",
                                              }}
                                            >
                                              +
                                              {price.toLocaleString(
                                                "en-US"
                                              )}
                                              $
                                            </span>
                                          )}
                                        </div>
                                      )
                                    )}
                                  </div>
                                ) : (
                                  <span
                                    className="text-[14px] opacity-50"
                                    style={{
                                      fontFamily:
                                        "noah-regular, sans-serif",
                                    }}
                                  >
                                    Not available
                                  </span>
                                )}
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </article>
                )
              )}

              {/* EMPTY SECOND COLUMN */}
              {comparisonColumns.length === 1 && (
                <div className="min-h-[700px] rounded-[12px] border border-dashed border-[#C6C0AF] flex items-center justify-center">
                  <Link
                    to="/saunas"
                    className="flex flex-col items-center text-center p-10"
                  >
                    <div className="w-14 h-14 rounded-full border border-[#C6C0AF] flex items-center justify-center">
                      <LuPlus className="w-6 h-6" />
                    </div>

                    <h3
                      className="mt-5 text-[28px]"
                      style={{
                        fontFamily:
                          "sogo-light, sans-serif",
                      }}
                    >
                      Compare another sauna
                    </h3>

                    <p
                      className="mt-2 max-w-[350px] text-[15px] opacity-70"
                      style={{
                        fontFamily:
                          "noah-regular, sans-serif",
                      }}
                    >
                      Choose one more model to see
                      the full side-by-side comparison.
                    </p>
                  </Link>
                </div>
              )}
            </div>

            {/* MOBILE NOTICE */}
            <p
              className="mt-8 text-center text-[14px] opacity-60 lg:hidden"
              style={{
                fontFamily:
                  "noah-regular, sans-serif",
              }}
            >
              Swipe down to compare all specifications
              and options.
            </p>

            {/* DESKTOP COMPARISON MATRIX */}
            {comparisonColumns.length === 2 && (
              <div className="hidden xl:block mt-16">
                <div
                  className="mb-6 flex items-center gap-2"
                  style={{
                    fontFamily:
                      "noah-bold, sans-serif",
                  }}
                >
                  <LeafIcon className="w-[12px] h-[12px]" />
                  <span>at a glance.</span>
                </div>

                <div className="grid grid-cols-[280px_1fr_1fr] border border-[#C6C0AF] rounded-[12px] overflow-hidden bg-[#F7F5EF]">
                  <div className="bg-[#313C2B] text-[#F7F5F0] p-6">
                    <span
                      style={{
                        fontFamily:
                          "noah-bold, sans-serif",
                      }}
                    >
                      Feature
                    </span>
                  </div>

                  {comparisonColumns.map(
                    (column) => (
                      <div
                        key={column.model.id}
                        className="p-6 border-l border-[#C6C0AF]"
                      >
                        <span
                          className="text-[22px]"
                          style={{
                            fontFamily:
                              "sogo-light, sans-serif",
                          }}
                        >
                          {column.model.model_name}
                        </span>
                      </div>
                    )
                  )}

                  {[
                    ["Price", (model: SaunaModel) =>
                      `$${Number(
                        model.price || 0
                      ).toLocaleString("en-US")}`],

                    ["People", (model: SaunaModel) =>
                      `${model.people}`],

                    ["Area", (model: SaunaModel) =>
                      `${model.area_m2} m²`],

                    ["Rooms", (model: SaunaModel) =>
                      `${model.rooms}`],

                    ["Exterior", (model: SaunaModel) =>
                      formatDimensions(
                        model.exterior_mm
                      )],

                    ["Interior", (model: SaunaModel) =>
                      formatDimensions(
                        model.interior_mm
                      )],

                    ["Weight", (model: SaunaModel) =>
                      model.weight_kg
                        ? `${model.weight_kg} kg`
                        : "-"],
                  ].map(
                    ([label, formatter]) => (
                      <div
                        key={String(label)}
                        className="contents"
                      >
                        <div className="p-5 border-t border-[#C6C0AF] bg-[#EDE9DF]">
                          <span
                            style={{
                              fontFamily:
                                "noah-bold, sans-serif",
                            }}
                          >
                            {String(label)}
                          </span>
                        </div>

                        {comparisonColumns.map(
                          (column) => (
                            <div
                              key={`${column.model.id}-${String(
                                label
                              )}`}
                              className="p-5 border-t border-l border-[#C6C0AF]"
                              style={{
                                fontFamily:
                                  "noah-regular, sans-serif",
                              }}
                            >
                              {(
                                formatter as (
                                  model: SaunaModel
                                ) => string
                              )(column.model)}
                            </div>
                          )
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}


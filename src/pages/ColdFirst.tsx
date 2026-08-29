import coldFirst from "../assets/images/coldFirst.png"
import { HiArrowRight } from "react-icons/hi";
import { useState } from "react";
import { supabase } from "../utils/supabase";
import ComeMeetUsFooter from "../components/ComeMeetUsFooter";

export default function ColdFirst() {

   const [email, setEmail] = useState("");
    
   const handleSubscribe = async () => {
      if (!email) return;
    
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert([{ email }]);
    
      if (!error) {
        alert("Subscribed!");
        setEmail("");
      } else {
        console.log(error);
      }
    };

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-black">
      
      <section className="w-full mb-16">
          <div className="relative w-full h-[400px] overflow-hidden">

            <img
              src={coldFirst}
              alt={"main_img"}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/20" />

            <div className="absolute bottom-18 left-6 md:left-64 text-white">
              <div className="flex items-end gap-16 max-w-[1400px]">
                <p className="w-[1000px] text-[64px] leading-[0.95]" style={{ fontFamily: "sogo-light, sans-serif" }}>
                  Cold first, then heat. A calmer way to do contrast, with science behind it
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-[200px]">
         <div className="mt-[100px] grid grid-cols-[1.1fr_0.9fr]">
          <div className="pl-[260px] pr-[40px] flex flex-col space-y-6">
            <h2 className="text-[20px] text-[#778658]" style={{ fontFamily: "noah-bold, sans-serif" }}>
             Published on March 3, 2026
            </h2>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>Cold plunge after sauna is the classic contrast ritual. It can feel amazing, but for many people the first cold contact triggers a sharp gasp, fast breathing, and a spike in “fight or flight” sensations. That is not weakness. It is a well described reflex called the cold shock response, driven primarily by rapid skin cooling. ¹</p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>A simple tweak that some sauna goers prefer is introducing a short cold exposure before the first sauna round, then doing the deeper cold exposures later. The idea is not to “toughen up”. The logic: help your nervous system “meet the cold” first, so that post-sauna cold feels more controlled and less stressful to your body. </p>
            <h3 className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}><strong>What the research supports</strong></h3>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>There is strong evidence for the mechanism behind this approach, even if the exact “cold first versus cold after sauna” sequence has not been studied as a single perfect protocol. </p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}><strong>1) Cold shock is real and measurable</strong> <br /> Sudden cold water exposure can cause an involuntary gasp and hyperventilation, along with a sympathetic surge. This is one reason cold water can feel instantly intense. ¹</p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}><strong>2) The cold shock response habituates with repeated exposure</strong> <br /> A systematic review and meta-analysis found that repeated cold-water immersions reduce the cold shock response — with large reductions in the respiratory components (breathing rate and ventilation) and meaningful reductions in heart rate response.² A classic study shows the same pattern: the initial cold shock can habituate through repeated immersions, even when exposures are not maximally cold.³</p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}><strong>3) Why it starts to feel calmer: lower sympathetic activation</strong> <br /> Beyond changes in breathing and heart rate, reviews on human cold habituation suggest a broader adaptation: attenuated sympathetic (“fight-or-flight”) activation during cold exposure.⁴ This helps explain why, over time, cold can feel more controlled and less stressful.</p>
            <h3 className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}><strong>Women & cold: can it be “more intense” and does that make it riskier? </strong></h3>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>Cold water immersion triggers the cold shock response (rapid breathing, increased heart rate and blood pressure), and this can increase cardiovascular strain in anyone — especially if the face is submerged, breathing is uncontrolled, or breath-holding is involved (a situation linked with “autonomic conflict” and more arrhythmias). ⁵</p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>Some evidence suggests women may experience higher cardiovascular strain during cold-water immersion compared with men in certain protocols, and many women also report greater cold discomfort. ⁶ In addition, thermoregulation can shift across the menstrual cycle (core temperature and regulatory thresholds change), meaning cold can feel different from week to week, but the pattern is individual. ⁷</p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>Practical takeaway: for women (especially beginners), consider starting with shorter and slightly warmer cold exposure, prioritize calm breathing, and adjust intensity based on cycle phase, sleep and stress — your body is the best data. </p>
            <h3 className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}><strong>A practical Leil style protocol </strong></h3>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>This is a gentle, realistic way to test the “cold first” idea without turning it into an extreme challenge. </p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}><strong>1) Pre-cold introduction (10–30 sec)</strong> <br /> Before your first sauna round, do a short cold rinse or dip. Start with feet/hands → limbs → torso. Keep breathing slow and controlled. If you’re not regularly acclimatised to cold water, keep this intro cool rather than ice-cold (e.g., roughly 10–20°C). The goal is control, not shock.</p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}><strong>2) Sauna round (10–15 min)</strong> <br /> Warm gradually. Calm pace.</p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}><strong>3) Cold after sauna (30–90 sec, controlled)</strong> <br /> Now do your main cold exposure. Aim for “invigorated and calm,” not panic breathing. </p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}><strong>4) Rest (5–10 min)</strong> <br /> Hydrate, settle your pulse, repeat 2–3 rounds. Sip water slowly. Room-temperature water is generally the gentlest option on the body during sauna sessions. Consider electrolytes if you’ve been sweating a lot.</p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>If you have cardiovascular disease, uncontrolled high blood pressure, arrhythmias, or you are pregnant, consult your clinician before cold immersion. Cold water can create sharp cardiovascular demands. ⁸</p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>Never do breath holds or forced hyperventilation in or near water. ⁸ </p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>To conclude, the claim is not that “cold first stops stress hormones completely”. The stronger claim the literature supports is this: cold exposure can trigger a strong reflex response, and that response can be reduced through habituation and repeated, controlled exposures. </p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>Putting a short cold exposure first is a practical way to start that habituation inside a sauna session.  </p>
            <p ><br /></p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>References</p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>¹ Tipton, M. J. (2006). Respiratory responses to cold water immersion: Neural pathways, interactions, and clinical consequences. <em>Journal of Applied Physiology, 100</em>(6), 2057–2064. <br/> <a href="https://journals.physiology.org/doi/full/10.1152/japplphysiol.01201.2005?utm_source=chatgpt.com">https://journals.physiology.org/doi/full/10.1152/japplphysiol.01201.2005</a> </p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>² Barwood, M. J., Eglin, C., Hills, S. P., Johnston, N., Massey, H., McMorris, T., Tipton, M. J., Wakabayashi, H., & Webster, L. (2024). Habituation of the cold shock response: A systematic review and meta-analysis.  <em>Journal of Thermal Biology, 119</em>(6), 103775. <br/> <a href="https://www.sciencedirect.com/science/article/pii/S0306456523003169?utm_source=chatgpt.com">https://www.sciencedirect.com/science/article/pii/S0306456523003169</a> </p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>³ Tipton, M. J., Golden, F. S. C., Higenbottam, C., Mekjavic, I. B., & Eglin, C. M. (1998). Temperature dependence of habituation of the initial responses to cold-water immersion.  <em>European Journal of Applied Physiology and Occupational Physiology, 78</em>, 253–257. <br/> <a href="https://link.springer.com/article/10.1007/s004210050416?utm_source=chatgpt.com">https://link.springer.com/article/10.1007/s004210050416</a> </p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>⁴ Yurkevicius, B. R., Alba, B. K., Seeley, A. D., & Castellani, J. W. (2021). Human cold habituation: Physiology, timeline, and modifiers.  <em>Temperature, 9</em>(2), 122–157. <br/> <a href="https://www.tandfonline.com/doi/full/10.1080/23328940.2021.1903145">https://www.tandfonline.com/doi/full/10.1080/23328940.2021.1903145</a> </p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>⁵ Shattock, M. J., & Tipton, M. J. (2012). ‘Autonomic conflict’: A different way to die during cold water immersion?  <em>The Journal of Physiology, 590</em>(14), 3219–3230. <br/> <a href="https://physoc.onlinelibrary.wiley.com/doi/abs/10.1113/jphysiol.2012.229864">https://physoc.onlinelibrary.wiley.com/doi/full/10.1113/jphysiol.2012.229864</a> </p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>⁶ Tsoutsoubi, L., Ioannou, L. G., Mantzios, K., Ziaka, S., Nybo, L., & Flouris, A. D. (2022). Cardiovascular stress and characteristics of cold-induced vasodilation in women and men during cold-water immersion: A randomized control study.  <em>Biology, 11</em>(7), 1054. <br/> <a href="https://www.mdpi.com/2079-7737/11/7/1054?utm_source=chatgpt.com">https://www.mdpi.com/2079-7737/11/7/1054</a> </p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>⁷ Baker, F. C., Siboza, F., & Fuller, A. (2020). Temperature regulation in women: Effects of the menstrual cycle.  <em>Temperature, 7</em>(3), 226–262. <br/> <a href="https://www.tandfonline.com/doi/full/10.1080/23328940.2020.1735927">https://www.tandfonline.com/doi/full/10.1080/23328940.2020.1735927</a> </p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>⁸ Tipton, M., Massey, H., Mayhew, A., & Morgan, P. (2022). Cold water therapies: Minimising risks.  <em>British Journal of Sports Medicine, 56</em>(23), 1332–1334. <br/> <a href="https://bjsm.bmj.com/content/56/23/1332?utm_source=chatgpt.com">https://bjsm.bmj.com/content/56/23/1332</a> </p>
          </div>
        
        <div className="border-l border-[#C6C0AF] pl-[30px]">
         <div className="bg-[#1B2017] rounded-[8px] p-[30px] w-[580px] h-[230px]">
            <h3 className="mb-2 text-[20px] whitespace-nowrap text-white" style={{fontFamily: "noah-bold, sans-serif"}}>
              Subscribe to the newsletter
            </h3>

            <p className="mb-2 text-[16px] whitespace-nowrap text-[#C6C0AF]" style={{fontFamily: "noah-regular, sans-serif"}}>
              Keep up to date with our product updates, news and special offers just for you.
            </p>
          
            <div className="flex items-center gap-3 mt-8">
             <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-[52px] flex-1 rounded-[8px] bg-[#313b2a] px-4 text-white placeholder:text-[#8D9487] outline-none text-[20px]" style={{ fontFamily: "noah-regular, sans-serif" }} />
              <button onClick={handleSubscribe} className="w-[50px] h-13 bg-white rounded-md flex items-center justify-center text-[#171D12] hover:bg-gray-200 transition">
                <HiArrowRight size={21} />
              </button>
            </div>
         </div>
        </div>
         </div>
        </section>
    <ComeMeetUsFooter/>
    </div>
  )
}

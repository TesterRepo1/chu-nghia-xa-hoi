// components/Introduction.jsx
import React, { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment, Center, ContactShadows } from "@react-three/drei";
import { motion } from "framer-motion";
import { BookOpen, Flame, Scale, GraduationCap, Star, Users, Building2 } from "lucide-react";

function RotatingGLTFModel({ url, scale = 1, duration = 5000 }) {
  const { scene } = useGLTF(url);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let frame;
    let start;
    function animate(ts) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const rot = (elapsed / duration) * Math.PI * 2;
      setRotation(rot > Math.PI * 2 ? Math.PI * 2 :  rot);
      if (elapsed < duration) frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [url, duration]);

  return <primitive object={scene. clone()} scale={scale} rotation={[0, rotation, 0]} />;
}

const models = [
  { url: "models/Notebookhcm01.glb", scale: 15 },
  { url: "models/Notebookhcm02.glb", scale: 0.018 },
  { url: "models/Notebookhcm03.glb", scale: 0.016 },
  { url: "models/Notebookhcm04.glb", scale: 24 }
];

// 4 góc độ tiếp cận CNXH - Cập nhật theo script
const APPROACHES = [
  {
    icon:  Flame,
    title: "Phong trào thực tiễn",
    description: "Phong trào của quần chúng lao động đấu tranh chống áp bức, bóc lột.",
    number: "01"
  },
  {
    icon:  BookOpen,
    title: "Trào lưu tư tưởng lý luận",
    description: "Phản ánh khát vọng về một xã hội công bằng, tiến bộ.",
    number: "02"
  },
  {
    icon:  GraduationCap,
    title:  "Khoa học",
    description: "Chủ nghĩa xã hội khoa học do C.  Mác và Ph.  Ăngghen sáng lập.",
    number: "03"
  },
  {
    icon: Building2,
    title: "Chế độ xã hội",
    description: "Chế độ xã hội tốt đẹp, giai đoạn đầu của hình thái kinh tế – xã hội cộng sản chủ nghĩa.",
    number: "04"
  }
];

// 2 giai đoạn của HTKT-XH CSCN - Cập nhật theo script
const STAGES = [
  {
    stage: "Giai đoạn thấp",
    title: "Chủ nghĩa xã hội",
    desc: "Xã hội mới ra đời từ chủ nghĩa tư bản, trên nhiều phương diện vẫn còn mang dấu vết của xã hội cũ về kinh tế, phân phối và ý thức xã hội."
  },
  {
    stage:  "Giai đoạn cao",
    title:  "Chủ nghĩa cộng sản",
    desc: "Xã hội phát triển hoàn thiện với nguyên tắc \"Làm theo năng lực, hưởng theo nhu cầu\" - xóa bỏ hoàn toàn giai cấp và nhà nước."
  }
];

export default function Introduction() {
  const [index, setIndex] = useState(0);
  const [activeApproach, setActiveApproach] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex(prev => (prev + 1) % models.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <section 
      id="introduction"
      className="relative w-full bg-gradient-to-b from-red-950 via-red-900 to-red-950 py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-yellow-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-red-600/20 rounded-full blur-[80px]"></div>
      </div>

      {/* Top border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-400 text-sm font-medium mb-6">
            <Star className="w-4 h-4" fill="currentColor" />
            Phần I - Mục 1 & 2
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Khái niệm <span className="text-yellow-400">Chủ nghĩa xã hội</span>
          </h2>
          <p className="text-xl text-yellow-100/60 max-w-3xl mx-auto">
            Chủ nghĩa xã hội được tiếp cận dưới bốn góc độ khác nhau, 
            tạo nên một hệ thống lý luận toàn diện và khoa học
          </p>
        </motion.div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left:  4 Approaches */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center text-red-900 font-bold">1</span>
              Bốn góc độ tiếp cận CNXH
            </h3>

            <div className="space-y-4">
              {APPROACHES.map((approach, idx) => (
                <motion.div
                  key={idx}
                  className={`group relative p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                    activeApproach === idx 
                      ? 'bg-red-800/50 border-yellow-500/50 shadow-lg shadow-yellow-500/10' 
                      : 'bg-red-800/20 border-yellow-500/20 hover:border-yellow-500/40'
                  }`}
                  onClick={() => setActiveApproach(idx)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg">
                      <approach.icon className="w-5 h-5 text-red-900" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-white">{approach.title}</h4>
                        <span className="text-xs text-yellow-500/50 font-mono">{approach.number}</span>
                      </div>
                      <p className="text-sm text-yellow-100/60 leading-relaxed">
                        {approach. description}
                      </p>
                    </div>
                  </div>
                  
                  {activeApproach === idx && (
                    <motion.div 
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-yellow-500 rounded-r-full"
                      layoutId="activeApproach"
                    />
                  )}
                </motion. div>
              ))}
            </div>
          </motion.div>

          {/* Right: 3D Model + 2 Stages */}
          <div className="space-y-8">
            {/* 3D Model */}
            <motion.div 
              className="relative bg-gradient-to-br from-red-800/50 to-red-900/50 rounded-3xl overflow-hidden border-2 border-yellow-500/30"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {/* Corner stars */}
              <div className="absolute top-4 left-4 z-10">
                <Star className="w-6 h-6 text-yellow-500/50" fill="currentColor" />
              </div>
              <div className="absolute top-4 right-4 z-10">
                <Star className="w-6 h-6 text-yellow-500/50" fill="currentColor" />
              </div>

              <div className="h-[300px]">
                <Canvas shadows camera={{ position: [-1, 6.5, 4.5], fov: 32 }}>
                  <color attach="background" args={["transparent"]} />
                  <ambientLight intensity={0.6} />
                  <directionalLight intensity={1.2} position={[2, 5, 5]} castShadow />
                  <ContactShadows position={[0, -1, 0]} opacity={0.3} scale={10} blur={2.5} />
                  <Environment preset="city" />
                  <Suspense fallback={null}>
                    <Center>
                      <RotatingGLTFModel url={models[index]. url} scale={models[index].scale} duration={5000} />
                    </Center>
                  </Suspense>
                </Canvas>
              </div>
              
              {/* Model indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1. 5">
                {models.map((_, i) => (
                  <div 
                    key={i}
                    className={`h-1. 5 rounded-full transition-all ${
                      i === index ?  'w-6 bg-yellow-400' : 'w-1. 5 bg-yellow-500/30'
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* 2 Stages */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center text-red-900 font-bold">2</span>
                Hai giai đoạn phát triển
              </h3>

              <div className="relative">
                {/* Connection line */}
                <div className="absolute left-6 top-12 bottom-12 w-0.5 bg-gradient-to-b from-yellow-500 to-yellow-600"></div>

                <div className="space-y-6">
                  {STAGES.map((stage, idx) => (
                    <div key={idx} className="relative flex gap-6">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg z-10">
                        <span className="text-red-900 font-bold">{idx + 1}</span>
                      </div>
                      <div className="flex-1 p-5 bg-red-800/30 border border-yellow-500/20 rounded-2xl">
                        <span className="text-xs font-semibold uppercase tracking-wider text-yellow-500">
                          {stage.stage}
                        </span>
                        <h4 className="text-lg font-bold text-white mt-1 mb-2">{stage.title}</h4>
                        <p className="text-sm text-yellow-100/60">{stage.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion. div>
          </div>
        </div>

        {/* Học thuyết hình thái kinh tế - xã hội */}
        <motion. div 
          className="mt-16 p-8 bg-red-800/30 border-2 border-yellow-500/30 rounded-3xl relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl"></div>
          <div className="relative">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-8 h-8 text-red-900" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">Học thuyết hình thái kinh tế - xã hội</h4>
                <p className="text-yellow-400">Chủ nghĩa Mác - Lênin</p>
              </div>
            </div>
            
            <div className="space-y-4 text-yellow-100/80">
              <p className="leading-relaxed">
                Học thuyết hình thái kinh tế - xã hội của chủ nghĩa Mác - Lênin đã chỉ ra <span className="text-yellow-400 font-medium">tính tất yếu</span> sự thay thế hình thái kinh tế - xã hội tư bản chủ nghĩa bằng hình thái kinh tế - xã hội cộng sản chủ nghĩa, đó là <span className="text-yellow-400 font-medium">quá trình lịch sử - tự nhiên</span>. 
              </p>
              <p className="leading-relaxed">
                Giữa xã hội tư bản chủ nghĩa và xã hội cộng sản chủ nghĩa là một <span className="text-yellow-400 font-medium">thời kỳ quá độ</span> lên chủ nghĩa cộng sản. 
              </p>
            </div>
          </div>
        </motion. div>

        {/* Quote box */}
        <motion.div 
          className="mt-12 p-8 bg-red-800/30 border-2 border-yellow-500/30 rounded-3xl relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity:  1, y:  0 }}
          viewport={{ once:  true }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl"></div>
          <div className="relative flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-red-900" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432. 917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
            </div>
            <div className="flex-1 text-center md:text-left">
              <blockquote className="text-xl text-white italic mb-3">
                "Sự thay thế chủ nghĩa tư bản bằng chủ nghĩa cộng sản là một quá trình lịch sử – tự nhiên, 
                không phụ thuộc vào ý muốn chủ quan của con người."
              </blockquote>
              <cite className="text-yellow-400 font-semibold not-italic">
                — Học thuyết hình thái kinh tế – xã hội, Chủ nghĩa Mác – Lênin
              </cite>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
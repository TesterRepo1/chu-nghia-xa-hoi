// components/Applicability. jsx
import React, { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment, Center, ContactShadows } from "@react-three/drei";
import { motion } from "framer-motion";
import { ArrowRight, Layers, Scale, BookOpen, Users, Building2, Brain, Globe2, CheckCircle, ChevronRight, Star } from "lucide-react";

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

// Quan điểm của Mác và Lênin - Cập nhật theo script
const THEORISTS = [
  {
    name: "C. Mác",
    work: "Phê phán Cương lĩnh Gôta (1875)",
    quote: "Giữa xã hội tư bản chủ nghĩa và xã hội cộng sản chủ nghĩa là một thời kỳ cải biến cách mạng từ xã hội nọ sang xã hội kia.  Thích ứng với thời kỳ ấy là một thời kỳ quá độ chính trị, và nhà nước của thời kỳ ấy không thể là cái gì khác hơn là nền chuyên chính cách mạng của giai cấp vô sản.",
    avatar: "M"
  },
  {
    name:  "V. I. Lênin",
    work: "Kinh tế và chính trị trong thời đại CCVS",
    quote:  "Về lý luận, không thể nghi ngờ gì được rằng giữa chủ nghĩa tư bản và chủ nghĩa cộng sản, có một thời kỳ quá độ nhất định.",
    avatar: "L"
  }
];

// Hai loại hình quá độ - Cập nhật theo script
const TRANSITION_TYPES = [
  {
    type: "Quá độ trực tiếp",
    desc: "Từ chủ nghĩa tư bản lên chủ nghĩa cộng sản đối với những nước đã trải qua chủ nghĩa tư bản phát triển.",
    icon: "🏭",
    color:  "from-yellow-500 to-yellow-600"
  },
  {
    type: "Quá độ gián tiếp",
    desc: "Từ những nước chưa trải qua chủ nghĩa tư bản phát triển đi lên chủ nghĩa xã hội.",
    icon: "🌱",
    color:  "from-red-500 to-red-600"
  }
];

// 4 đặc điểm cơ bản của thời kỳ quá độ - Cập nhật theo script
const FEATURES = [
  {
    icon: Building2,
    title: "Kinh tế",
    subtitle: "Nhiều thành phần",
    points: [
      "Tồn tại nền kinh tế nhiều thành phần, có các thành phần đối lập nhau",
      "Ở Nga, Lênin xác định có 5 thành phần kinh tế",
      "Từ kinh tế gia trưởng, kinh tế hàng hóa nhỏ",
      "Đến kinh tế tư bản tư nhân, tư bản nhà nước và kinh tế XHCN"
    ],
    color: "from-yellow-500 to-yellow-600"
  },
  {
    icon: Scale,
    title:  "Chính trị",
    subtitle: "Chuyên chính vô sản",
    points: [
      "Thiết lập, tăng cường chuyên chính vô sản",
      "Giai cấp công nhân nắm và sử dụng quyền lực nhà nước",
      "Trấn áp giai cấp tư sản",
      "Xây dựng xã hội mới"
    ],
    color: "from-red-500 to-red-600"
  },
  {
    icon: Brain,
    title:  "Tư tưởng - Văn hóa",
    subtitle: "Song song tồn tại",
    points: [
      "Tồn tại nhiều tư tưởng khác nhau, chủ yếu là vô sản và tư sản",
      "Giai cấp công nhân từng bước xây dựng nền văn hóa mới XHCN",
      "Tiếp thu giá trị văn hóa dân tộc",
      "Kế thừa tinh hoa văn hóa nhân loại"
    ],
    color: "from-yellow-500 to-yellow-600"
  },
  {
    icon: Users,
    title: "Xã hội",
    subtitle: "Còn tồn tại phân hóa",
    points: [
      "Tồn tại nhiều giai cấp, tầng lớp xã hội vừa hợp tác vừa đấu tranh",
      "Còn sự khác biệt giữa thành thị và nông thôn",
      "Còn sự khác biệt giữa lao động trí óc và lao động chân tay",
      "Chưa được xóa bỏ hoàn toàn"
    ],
    color: "from-red-500 to-red-600"
  }
];

const Applicability = () => {
  const [index, setIndex] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex(prev => (prev + 1) % models.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <section 
      id="transition"
      className="relative py-24 bg-gradient-to-b from-red-950 via-red-900 to-red-950 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-yellow-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[100px]"></div>
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-400 text-sm font-medium mb-6">
            <Star className="w-4 h-4" fill="currentColor" />
            Phần II
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Thời Kỳ <span className="text-yellow-400">Quá Độ</span> Lên CNXH
          </h2>
          <p className="text-xl text-yellow-100/60 max-w-3xl mx-auto">
            Thời kỳ cải biến cách mạng sâu sắc, triệt để từ xã hội tư bản chủ nghĩa sang xã hội xã hội chủ nghĩa
          </p>
        </motion.div>

        {/* Theorists Quotes */}
        <motion.div 
          className="grid md:grid-cols-2 gap-6 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {THEORISTS.map((theorist, idx) => (
            <div 
              key={idx}
              className="relative p-6 bg-red-800/30 border-2 border-yellow-500/20 rounded-2xl overflow-hidden group hover:border-yellow-500/40 transition-all"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-yellow-600/20 to-transparent rounded-full blur-2xl"></div>
              
              <div className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-red-900 font-bold text-xl shadow-lg">
                    {theorist. avatar}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{theorist.name}</h3>
                    <p className="text-sm text-yellow-500/70">{theorist.work}</p>
                  </div>
                </div>
                
                <blockquote className="text-yellow-100/80 italic leading-relaxed border-l-2 border-yellow-500 pl-4">
                  "{theorist.quote}"
                </blockquote>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Định nghĩa thời kỳ quá độ */}
        <motion. div 
          className="mb-16 p-8 bg-red-800/40 border-2 border-yellow-500/30 rounded-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-red-900" />
            </div>
            <h3 className="text-xl font-bold text-white">Định nghĩa thời kỳ quá độ</h3>
          </div>
          <p className="text-yellow-100/80 leading-relaxed">
            Đây là thời kỳ cải biến cách mạng sâu sắc, triệt để từ xã hội tư bản chủ nghĩa sang xã hội xã hội chủ nghĩa, <span className="text-yellow-400 font-medium">bắt đầu từ khi giai cấp công nhân giành được chính quyền</span> cho đến khi <span className="text-yellow-400 font-medium">xây dựng xong các cơ sở của CNXH</span>. 
          </p>
        </motion. div>

        {/* Transition Types & Bridge Visualization */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-10 flex items-center justify-center gap-3">
            <Layers className="w-6 h-6 text-yellow-400" />
            Tính tất yếu và loại hình quá độ
          </h3>

          {/* Bridge Visualization */}
          <div className="relative max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-between">
              {/* Left:  CNTB */}
              <div className="text-center">
                <div className="w-20 h-20 bg-red-800/50 border-2 border-yellow-500/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl">🏭</span>
                </div>
                <span className="text-sm font-medium text-yellow-100/70">Chủ nghĩa<br/>Tư bản</span>
              </div>

              {/* Bridge */}
              <div className="flex-1 mx-4 relative">
                <div className="h-2 bg-gradient-to-r from-red-700 via-yellow-500 to-red-700 rounded-full"></div>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-4 py-2 bg-yellow-500 text-red-900 text-sm font-semibold rounded-full whitespace-nowrap">
                  Thời kỳ quá độ
                </div>
                
                {/* Animated dots */}
                <motion.div 
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50"
                  animate={{ left: ["10%", "90%", "10%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>

              {/* Right:  CNXH */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-800 border-2 border-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Star className="w-8 h-8 text-yellow-400" fill="currentColor" />
                </div>
                <span className="text-sm font-medium text-yellow-100/70">Chủ nghĩa<br/>Xã hội</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-center text-yellow-100/60 text-sm mt-8 max-w-2xl mx-auto">
              Có thể ví thời kỳ quá độ như một <span className="text-yellow-400 font-medium">chiếc cầu nối</span> giữa hai bờ vực:  
              Không còn là bờ bên này (tư bản chủ nghĩa) nhưng cũng chưa hoàn toàn sang đến bờ bên kia (xã hội chủ nghĩa), 
              mà là một quá trình đan xen, đấu tranh quyết liệt để cái mới dần dần thay thế cái cũ.
            </p>
          </div>

          {/* Two Types */}
          <div className="grid md: grid-cols-2 gap-6 max-w-4xl mx-auto">
            {TRANSITION_TYPES.map((type, idx) => (
              <motion.div
                key={idx}
                className="relative p-6 bg-red-800/30 border-2 border-yellow-500/20 rounded-2xl overflow-hidden hover:border-yellow-500/40 transition-all"
                whileHover={{ scale: 1.02 }}
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${type.color}`}></div>
                
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{type.icon}</span>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">{type.type}</h4>
                    <p className="text-sm text-yellow-100/70">{type.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 4 Features - Interactive */}
        <motion.div
          id="features"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-10 flex items-center justify-center gap-3">
            <Globe2 className="w-6 h-6 text-yellow-400" />
            4 Đặc điểm cơ bản của thời kỳ quá độ
          </h3>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Feature Tabs */}
            <div className="lg:col-span-2 space-y-3">
              {FEATURES.map((feature, idx) => (
                <motion. button
                  key={idx}
                  onClick={() => setActiveFeature(idx)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    activeFeature === idx 
                      ? 'bg-red-800/50 border-yellow-500/50 shadow-lg shadow-yellow-900/20' 
                      : 'bg-red-800/20 border-yellow-500/20 hover: border-yellow-500/40'
                  }`}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{feature.title}</h4>
                      <p className="text-sm text-yellow-500/70">{feature.subtitle}</p>
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-transform ${
                      activeFeature === idx ? 'text-yellow-400 rotate-90' : 'text-yellow-600/50'
                    }`} />
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Feature Detail */}
            <div className="lg:col-span-3">
              <motion.div
                key={activeFeature}
                className="h-full p-8 bg-red-800/30 border-2 border-yellow-500/20 rounded-2xl"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${FEATURES[activeFeature].color} flex items-center justify-center shadow-lg`}>
                    {React.createElement(FEATURES[activeFeature]. icon, { className:  "w-7 h-7 text-white" })}
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-white">{FEATURES[activeFeature].title}</h4>
                    <p className="text-yellow-400">{FEATURES[activeFeature].subtitle}</p>
                  </div>
                </div>

                <ul className="space-y-4">
                  {FEATURES[activeFeature].points.map((point, i) => (
                    <motion.li 
                      key={i}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-yellow-100/80">{point}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* 3D Model Preview */}
                <div className="mt-8 h-[200px] bg-red-950/50 rounded-xl overflow-hidden border border-yellow-500/20">
                  <Canvas shadows camera={{ position: [-1, 3.5, 4.5], fov: 32 }}>
                    <color attach="background" args={["transparent"]} />
                    <ambientLight intensity={0.5} />
                    <directionalLight intensity={1.2} position={[2, 5, 5]} castShadow />
                    <ContactShadows position={[0, -1, 0]} opacity={0.30} scale={6} blur={2.5} />
                    <Environment preset="city" />
                    <Suspense fallback={null}>
                      <Center>
                        <RotatingGLTFModel url={models[index].url} scale={models[index].scale * 0.7} duration={5000} />
                      </Center>
                    </Suspense>
                  </Canvas>
                </div>
              </motion.div>
            </div>
          </div>
        </motion. div>

        {/* Quote */}
       
      </div>
    </section>
  );
};

export default Applicability;
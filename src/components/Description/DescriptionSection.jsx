// components/Description/DescriptionSection.jsx
import React, { Suspense, useEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Float,
  Html,
  Loader,
  OrbitControls,
  useTexture,
} from "@react-three/drei";
import { useAtom } from "jotai";
import { BOOK_LIBRARY, currentBookAtom } from "../../state/library";
import { Book } from "../Book/Book";
import { Bookmark } from "../Bookmark/Bookmark";
import * as THREE from "three";
import { motion } from "framer-motion";
import { Factory, Users, Landmark, CheckCircle2, Star, Target, Cog, Building2, UserCheck, Palette, Globe2 } from "lucide-react";

function InteractionBlocker({ size = [3.5, 3.0], position = [0, 0.03, 0] }) {
  return (
    <mesh
      position={position}
      onPointerDown={(e) => e.stopPropagation()}
      onPointerUp={(e) => e.stopPropagation()}
      onPointerMove={(e) => e.stopPropagation()}
      onPointerEnter={(e) => e.stopPropagation()}
      onPointerLeave={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      onWheel={(e) => e.stopPropagation()}
    >
      <planeGeometry args={size} />
      <meshBasicMaterial transparent opacity={0} depthWrite={false} />
    </mesh>
  );
}

const DescriptionExperience = ({ pages, bookmark }) => (
  <>
    <group position={[-1.0, 0, 0.25]} rotation={[-Math.PI / 7, 0, 0]}>
      <Float floatIntensity={0.5} speed={0.4} rotationIntensity={0.4}>
        <Book pages={pages} />
        <InteractionBlocker />
      </Float>
    </group>

    <group position={[1, 0, 0.2]} rotation={[-Math.PI / 7, 0, 0]}>
      <Float floatIntensity={0.6} speed={0.5} rotationIntensity={0.8}>
        <Bookmark />
      </Float>
    </group>

    <ambientLight intensity={0.5} />
    <directionalLight position={[2, 5, 2]} intensity={0.85} castShadow />
    <Environment preset="city" intensity={0.25} />
    <mesh position-y={-1.5} rotation-x={-Math.PI / 2} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <shadowMaterial transparent opacity={0.15} />
    </mesh>
    <OrbitControls enableZoom={true} minPolarAngle={0} maxPolarAngle={Math.PI} />
  </>
);

// Điều kiện ra đời CNXH - Cập nhật theo script
const CONDITIONS = [
  {
    icon: Factory,
    title:  "Điều kiện kinh tế",
    items: [
      "Lực lượng sản xuất phát triển ngày càng cao, mang tính xã hội hóa",
      "Mâu thuẫn gay gắt với quan hệ sản xuất tư bản chủ nghĩa dựa trên chế độ chiếm hữu tư nhân",
      "Quan hệ sản xuất trở thành \"xiềng xích\" của lực lượng sản xuất",
      "Khi đó bắt đầu thời đại một cuộc cách mạng xã hội"
    ]
  },
  {
    icon: Users,
    title: "Điều kiện chính trị - xã hội",
    items:  [
      "Giai cấp công nhân - \"con đẻ của nền đại công nghiệp\" - ngày càng trưởng thành",
      "Cuộc đấu tranh của giai cấp công nhân chống giai cấp tư sản",
      "Phát triển thành cách mạng vô sản lật đổ chế độ cũ",
      "Thiết lập nhà nước chuyên chính vô sản để xây dựng xã hội mới"
    ]
  }
];

// 6 Đặc trưng bản chất CNXH - Cập nhật theo script
const CHARACTERISTICS = [
  {
    icon: Target,
    title:  "Mục tiêu nhân văn",
    desc: "Giải phóng giai cấp, giải phóng dân tộc, giải phóng xã hội, giải phóng con người; tạo điều kiện để con người phát triển toàn diện."
  },
  {
    icon:  Cog,
    title: "Kinh tế",
    desc: "Nền kinh tế phát triển cao dựa trên lực lượng sản xuất hiện đại và chế độ công hữu về tư liệu sản xuất chủ yếu."
  },
  {
    icon: UserCheck,
    title: "Chính trị",
    desc: "Chế độ xã hội do nhân dân lao động làm chủ - nhân dân lao động là chủ thể của quyền lực xã hội."
  },
  {
    icon: Building2,
    title: "Nhà nước",
    desc:  "Nhà nước kiểu mới mang bản chất giai cấp công nhân, đại biểu cho lợi ích, quyền lực và ý chí của nhân dân lao động."
  },
  {
    icon: Palette,
    title:  "Văn hóa",
    desc: "Nền văn hóa phát triển cao, kế thừa và phát huy những giá trị của văn hóa dân tộc và tinh hoa văn hóa nhân loại."
  },
  {
    icon: Globe2,
    title: "Dân tộc & Quốc tế",
    desc:  "Bảo đảm bình đẳng, đoàn kết giữa các dân tộc và có quan hệ hữu nghị, hợp tác với nhân dân các nước trên thế giới."
  }
];

export const DescriptionSection = () => {
  const [bookIndex, setBookIndex] = useAtom(currentBookAtom);
  const current = BOOK_LIBRARY[bookIndex] || BOOK_LIBRARY[0];
  const pages = current.pages;
  const bookmark = current.bookmark || { front: "bookmark3", back: "bookmark2" };

  useEffect(() => {
    pages.forEach((p) => {
      useTexture. preload(`textures/${p.front}.jpg`);
      useTexture.preload(`textures/${p.back}.jpg`);
    });
    if (bookmark.front) useTexture.preload(`textures/${bookmark. front}.jpg`);
    if (bookmark.back) useTexture.preload(`textures/${bookmark. back}.jpg`);
    useTexture.preload(`textures/ruled-paper.jpg`);
  }, [pages, bookmark. front, bookmark.back]);

  const cameraPos = useMemo(
    () => typeof window !== "undefined" && window.innerWidth > 1024 ? [0.8, 1.2, 5] : [0.6, 1.0, 7],
    []
  );

  return (
    <section
      id="characteristics"
      className="relative w-full bg-gradient-to-b from-red-950 via-red-900 to-red-950 py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-600/20 rounded-full blur-[100px]"></div>
      </div>

      {/* Top border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity:  1, y:  0 }}
          viewport={{ once:  true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-400 text-sm font-medium mb-6">
            <Star className="w-4 h-4" fill="currentColor" />
            Phần I - Mục 3 & 4
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Điều kiện ra đời & <span className="text-yellow-400">Đặc trưng bản chất</span>
          </h2>
          <p className="text-xl text-yellow-100/60 max-w-3xl mx-auto">
            Cơ sở khoa học và thực tiễn cho sự hình thành chủ nghĩa xã hội
          </p>
        </motion.div>

        {/* Conditions - 2 columns */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {CONDITIONS.map((condition, idx) => (
            <motion.div
              key={idx}
              className="relative p-8 bg-red-800/30 border-2 border-yellow-500/20 rounded-3xl overflow-hidden group hover:border-yellow-500/40 transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              {/* Background gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl group-hover:bg-yellow-500/20 transition-all"></div>
              
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/20">
                    <condition.icon className="w-6 h-6 text-red-900" />
                  </div>
                  <div>
                    <span className="text-xs text-yellow-500/70 uppercase tracking-wider">Điều kiện {idx + 1}</span>
                    <h3 className="text-xl font-bold text-white">{condition.title}</h3>
                  </div>
                </div>

                <ul className="space-y-3">
                  {condition.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-yellow-100/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote từ Mác - Ăngghen */}
        <motion.div 
          className="mb-16 p-6 bg-red-800/40 border-l-4 border-yellow-500 rounded-r-2xl"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <blockquote className="text-lg text-white italic">
            "Từ chỗ là những hình thức phát triển của các lực lượng sản xuất, những quan hệ ấy trở thành những <span className="text-yellow-400 font-medium">xiềng xích</span> của các lực lượng sản xuất.  Khi đó bắt đầu thời đại một cuộc cách mạng xã hội."
          </blockquote>
          <cite className="mt-3 block text-yellow-400 font-semibold not-italic">
            — C. Mác & Ph. Ăngghen
          </cite>
        </motion.div>

        {/* Characteristics Grid - 6 đặc trưng */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="h-px w-12 bg-yellow-500/30"></div>
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <Star className="w-6 h-6 text-yellow-400" fill="currentColor" />
              6 Đặc trưng bản chất của CNXH
            </h3>
            <div className="h-px w-12 bg-yellow-500/30"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CHARACTERISTICS.map((char, idx) => (
              <motion. div
                key={idx}
                className="group p-6 bg-red-800/30 border-2 border-yellow-500/20 rounded-2xl hover:border-yellow-500/40 hover:bg-red-800/50 transition-all"
                initial={{ opacity:  0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg">
                  <char.icon className="w-6 h-6 text-red-900" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{char.title}</h4>
                <p className="text-sm text-yellow-100/60 leading-relaxed">{char.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 3D Canvas */}
        <motion.div 
          className="mt-20 relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity:  1, y:  0 }}
          viewport={{ once:  true }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-yellow-500/10 rounded-3xl blur-3xl"></div>
          <div className="relative bg-red-800/30 border-2 border-yellow-500/30 rounded-3xl overflow-hidden">
            {/* Corner stars */}
            <div className="absolute top-4 left-4 z-10">
              <Star className="w-6 h-6 text-yellow-500/50" fill="currentColor" />
            </div>
            <div className="absolute top-4 right-4 z-10">
              <Star className="w-6 h-6 text-yellow-500/50" fill="currentColor" />
            </div>

            <div className="h-[500px]">
              <Canvas
                shadows
                style={{ width: "100%", height: "100%" }}
                camera={{ position: cameraPos, fov: 45 }}
                gl={{
                  toneMapping: THREE.ACESFilmicToneMapping,
                  outputEncoding: THREE.sRGBEncoding,
                }}
              >
                <Suspense fallback={null}>
                  <DescriptionExperience pages={pages} bookmark={bookmark} />
                </Suspense>
              </Canvas>
              <Loader />
            </div>
            
            {/* Canvas label */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-red-900/90 to-transparent p-6">
              <p className="text-center text-yellow-200/70 text-sm">
                🔄 Kéo để xoay • 🔍 Scroll để phóng to/thu nhỏ • 📖 Sổ tay học tập tư tưởng
              </p>
            </div>
          </div>
        </motion.div>

        {/* Kết luận phần I */}
        <motion.div 
          className="mt-16 text-center p-8 bg-red-800/30 border-2 border-yellow-500/30 rounded-3xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity:  1 }}
          viewport={{ once:  true }}
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg">
            <Star className="w-8 h-8 text-red-900" fill="currentColor" />
          </div>
          <p className="text-xl text-white leading-relaxed max-w-3xl mx-auto">
            Như vậy, <span className="text-yellow-400 font-medium">chủ nghĩa xã hội</span> không phải là một khái niệm trừu tượng mà là một <span className="text-yellow-400 font-medium">giai đoạn lịch sử – xã hội</span> có cơ sở khoa học và thực tiễn rõ ràng.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DescriptionSection;
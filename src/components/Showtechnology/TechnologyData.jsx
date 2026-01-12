// src/constants/TechnologyConfig.js

// 1. Import Logos
import ThreeJSLogo from "../../../public/logos/threejs.png";
import ChatGPTLogo from "../../../public/logos/chatgpt.png";
import ClaudeLogo from "../../../public/logos/claude.png";
import BlenderLogo from "../../../public/logos/blender.png";
import SketchfabLogo from "../../../public/logos/sketchfab.png";
import ReactLogo from "../../../public/logos/reactjs.png";
import NotebooklmLogo from "../../../public/logos/notebooklm.png";
import GithubcopilotLogo from "../../../public/logos/githubcopilot.png";

// 2. Import Videos
import ThreeJSVideo from "../../../public/videos/Threejs.mp4";
import ChatGPTVideo from "../../../public/videos/Chatgpt.mp4";
import ClaudeVideo from "../../../public/videos/Claude.mp4";
import BlenderVideo from "../../../public/videos/Blender.mp4";
import SketchfabVideo from "../../../public/videos/Sketchfab.mp4";
import ReactVideo from "../../../public/videos/Reactjs.mp4";
import NotebooklmVideo from "../../../public/videos/Notebooklm.mp4";
import GithubcopilotVideo from "../../../public/videos/Githubcopilot.mp4";

// 3. Định nghĩa Class hoặc Object Helper (Tuỳ chọn, giúp code rõ ràng hơn)
class TechItem {
  constructor(name, logo, video) {
    this.name = name;
    this.logo = logo;
    this.video = video;
  }
}

// 4. Danh sách công nghệ (Thêm mới tại đây)
export const technologies = [
  new TechItem("Three.js", ThreeJSLogo, ThreeJSVideo),
  new TechItem("ChatGPT", ChatGPTLogo, ChatGPTVideo),
  new TechItem("Claude", ClaudeLogo, ClaudeVideo),
  new TechItem("Blender", BlenderLogo, BlenderVideo),
  new TechItem("Sketchfab", SketchfabLogo, SketchfabVideo),
  new TechItem("ReactJS", ReactLogo, ReactVideo),
  new TechItem("NotebookLM", NotebooklmLogo, NotebooklmVideo),
  new TechItem("Github Copilot", GithubcopilotLogo, GithubcopilotVideo),
  // Muốn thêm cái mới? Chỉ cần thêm 1 dòng ở đây:
  // new TechItem("NextJS", NextLogo, NextVideo),
];
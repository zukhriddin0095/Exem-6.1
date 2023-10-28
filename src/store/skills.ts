// import { create } from "zustand";
// import { immer } from "zustand/middleware/immer";
// import { devtools } from "zustand/middleware";

// import Skill from "../types/skill";
// import User from "../types/user";
// import { USER } from "../constants";

// interface SkillState {
//   user: null | User;
//   skills: Skill[];
// }

// const useSkill = create<SkillState>()(
//   devtools(
//     immer((set, get) => ({
//       user: localStorage.getItem(USER)
//       ? JSON.parse(localStorage.getItem(USER) || "")
//       : null, 
//       skills: [],
//     }))
//   )
//   );

// export default useSkill;

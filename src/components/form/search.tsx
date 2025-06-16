// // components/inputs/InputField.tsx
// import React, { ReactNode } from "react";
// import { useFormContext, RegisterOptions, FieldError } from "react-hook-form";

// interface ISearchInputField {
//   name: string;

//   placeholder?: string;
//   validation?: RegisterOptions;
//   onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
//   icon: ReactNode;
//   value?: string;
//   onPressEnter?: () => void;
//   handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

// const SearchField: React.FC<ISearchInputField> = ({
//   name,
//   placeholder,
//   validation,
//   onClick,
//   icon,
//   value,
//   onPressEnter,
//   handleChange,
// }) => {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();

//   const error = errors[name] as FieldError | undefined;

//   return (
//     <div className="relative h-[46px] rounded-[4px] overflow-hidden">
//       <input
//         type={"text"}
//         placeholder={placeholder}
//         {...register(name, validation)}
//         className="w-full h-full ps-6"
//         value={value}
//         onChange={handleChange}
//         onKeyDown={(e) => e.key === "Enter" && onPressEnter?.()}
//       />
//       <button
//         className={
//           "gradient-blue-primary text-white px-3 h-full absolute right-0 z-10"
//         }
//         onClick={onClick}
//       >
//         {icon}
//       </button>
//     </div>
//   );
// };

// export default SearchField;

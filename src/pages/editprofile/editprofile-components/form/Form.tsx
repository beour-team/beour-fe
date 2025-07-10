import type {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import Email from "../input/Email";
import Name from "../input/Name";
import Nickname from "../input/Nickname";
import Password from "../input/Password";
import Phone from "../input/Phone";
import type { EditProfile } from "../../../../types/EditProfile";

interface Props {
  handleSubmit: UseFormHandleSubmit<EditProfile>;
  onSubmit: SubmitHandler<EditProfile>;
  register: UseFormRegister<EditProfile>;
  setValue: UseFormSetValue<EditProfile>;
  watch: UseFormWatch<EditProfile>;
  isSubmitting?: boolean;
  errors?: FieldErrors<EditProfile>;
}

const Form = ({
  handleSubmit,
  onSubmit,
  register,
  setValue,
  watch,
  errors,
}: Props) => {
  return (
    <form
      className="flex flex-col min-h-full justify-between gap-[2rem]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-[1.6rem]">
        <Nickname register={register} errors={errors} />

        <Password
          register={register}
          setValue={setValue}
          watch={watch}
          errors={errors}
        />

        <Name register={register} readOnly />

        <Phone register={register} errors={errors} />

        <Email watch={watch} readOnly />
      </div>

      <button
        type="submit"
        className={`h-[5rem] w-full rounded-[1rem] text-16-Medium transition-colors duration-200 bg-[#000] text-white`}
      >
        변경 완료
      </button>
    </form>
  );
};

export default Form;

import type {
  UseFormRegister,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";
import { warning } from "../../../../assets/theme";
import type { HostSpaceInfo } from "../../../../types/HostSpaceInfo";

interface RefundPolicyProps {
  register: UseFormRegister<HostSpaceInfo>;
  watch: UseFormWatch<HostSpaceInfo>;
  errors: FieldErrors<HostSpaceInfo>;
}

const RefundPolicy = ({ register, watch, errors }: RefundPolicyProps) => {
  return (
    <div className="flex flex-col gap-[0.8rem]">
      <label className="text-13-SemiBold">
        환불 정책<span className="text-cr-red">*</span>
      </label>
      <textarea
        {...register("refundPolicy")}
        placeholder="ex) 예약일 1일 전까지 전액 환불"
        maxLength={500}
        className={`w-full leading-[2.2rem] min-h-[10rem] rounded-[1rem] px-[1.7rem] py-[1.2rem] text-14-Medium bg-cr-100 placeholder:text-cr-500 resize-none
          ${
            errors.refundPolicy
              ? "border border-cr-red"
              : "border border-transparent"
          }`}
      />
      <div className="flex justify-between text-12-Regular text-cr-500">
        <div>
          {errors.refundPolicy && (
            <div className="flex gap-[0.6rem] items-center">
              <img src={warning} alt="경고 아이콘" />
              <span className="text-12-Medium text-red-500">
                {errors.refundPolicy.message}
              </span>
            </div>
          )}
        </div>
        <div>{watch("refundPolicy")?.length || 0}/500자</div>
      </div>
    </div>
  );
};

export default RefundPolicy;

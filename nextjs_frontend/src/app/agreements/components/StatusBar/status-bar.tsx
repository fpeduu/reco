import { StatusType } from "@/models/Acordos";
import { getStatusStep } from "@/services/statusSteps";

interface StatusBarProps {
  status: StatusType;
}

const primaryBarLengths = ["w-0", "w-1/5", "w-2/5",
                           "w-3/5", "w-full", "w-full", "w-0"];
const primaryBarColors = [
  "red-500",
  "amber-500",
  "amber-500",
  "amber-500",
  "emerald-500",
  "emerald-500",
  "gray-500"
];
const secondaryBarColors = [
  "bg-red-200",
  "bg-amber-200",
  "bg-amber-200",
  "bg-amber-200",
  "bg-emerald-200",
  "bg-emerald-200",
  "bg-gray-500"
];

export default function StatusBar({ status }: StatusBarProps) {
  const statusIndex = getStatusStep(status);
  const textColor = primaryBarColors.at(statusIndex);
  const barColor = primaryBarColors.at(statusIndex);
  const barLength = primaryBarLengths.at(statusIndex);
  const secondaryBarColor = secondaryBarColors.at(statusIndex);

  return (
    <>
      <span className={"mb-2 self-end text-sm text-" + textColor}>
        {status}.
      </span>
      <span className="w-full relative mb-3">
        <span className={"w-full h-3 absolute z-0 rounded-full " + secondaryBarColor} />
        <span className={barLength + " h-3 z-1 absolute rounded-full bg-" + barColor} />
      </span>
    </>
  );
}

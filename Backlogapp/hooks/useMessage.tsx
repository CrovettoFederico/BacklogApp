import { ResultType } from "@/Models/ResultType";
import { useState } from "react";

export function useMessage() {
  const [result, setResult] = useState<ResultType>({ result: "info", message: "", isShown: false });

  const handleShowMessage = (result: ResultType) => {
    setResult(result);
  };

  const handleCloseMessage = (): void => {
    setResult({ isShown: false, result: "info", message: "" });
  };

  return {
    result,
    handleCloseMessage,
    handleShowMessage
  };
}

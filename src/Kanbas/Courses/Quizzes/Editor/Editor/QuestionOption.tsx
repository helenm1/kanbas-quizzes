export type QuestionOptionProps = {
  option: string;
  index: number;
  handleAnswerSelect: (checked: boolean, option: string) => void;
};

function QuestionOption({
  option,
  index,
  handleAnswerSelect,
}: QuestionOptionProps) {
  return <div className="flex-fill d-flex gap-5">Quiz Editor </div>;
}

export default QuestionOption;

// react-loader-spinner
import { ThreeCircles, type _Props4 } from 'react-loader-spinner';

// ----------------------------------------------------------------

interface ISpinnerProps extends _Props4 {
  message?: string;
}

const Spinner: React.FC<ISpinnerProps> = ({
  height = 50,
  width = 200,
  color = '#00BFFF',
  message,
  ...rest
}) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <ThreeCircles color={color} height={height} width={width} wrapperClass="m-15" {...rest} />
      {message && <div className="text-lg text-center px-2">{message}</div>}
    </div>
  );
};

export default Spinner;

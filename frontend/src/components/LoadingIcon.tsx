import { Spinner } from "react-bootstrap";

const LoadingIcon: React.FC = () => {
  return (
    <div className="center">
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default LoadingIcon;

import { PacmanLoader } from 'react-spinners';

interface Props {
  loading: boolean;
}

export function LoadingOverlay({ loading }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="p-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <PacmanLoader loading={loading} color="yellow" />
      </div>
    </div>
  );
}

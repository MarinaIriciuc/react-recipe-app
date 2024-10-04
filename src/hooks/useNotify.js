import { toast } from 'react-toastify';

export default function useNotify() {
  function notify(type, message){
    if (type === 'success') {
      toast.success(message);
    } else if (type === 'info') {
      toast.info(message);
    } else if (type === 'warning') {
      toast.warning(message);
    } else if (type === 'error') {
      toast.error(message);
    } else {
      toast(message);
    }
  }

  return { notify };
}

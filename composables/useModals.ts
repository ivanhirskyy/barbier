import type { IModal } from '~/types';

export default function useModals() {
  const modals = useState<IModal[]>('modals', () => []);

  const addModal = (id: string, title?: string) => {
    modals.value.push({
      id,
      title: title || '',
      isOpen: false,
    });
  };

  const openModal = (id: string) => {
    const modal = modals.value.find((m) => m.id === id);
    if (modal) {
      modal.isOpen = true;
    }
  };

  const closeModal = (id: string) => {
    console.log('closeModal', id);
    const modal = modals.value.find((m) => m.id === id);
    if (modal) {
      modal.isOpen = false;
    }
  };

  const removeModal = (id: string) => {
    modals.value = modals.value.filter((m) => m.id !== id);
  };

  const isOpenModal = (id: string) => {
    const modal = modals.value.find((m) => m.id === id);
    return modal ? modal.isOpen : false;
  };

  return {
    modals,
    addModal,
    openModal,
    closeModal,
    removeModal,
    isOpenModal,
  };
}

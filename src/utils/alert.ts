import Swal from "sweetalert2";

export enum SwalIcon {
  Success = "success",
  Error = "error",
  Warning = "warning",
  Info = "info",
  Question = "question",
}

type Props = {
  title: string;
  text: string;
  icon?: SwalIcon;
  positiveButton?: string;
  negativeButton?: string;
  positiveCallback?: () => void;
  negativeCallback?: () => void;
  dismissible?: boolean;
  backdrop?: boolean;
};

const showAlert = ({
  positiveButton = "Okay",
  negativeButton,
  positiveCallback,
  negativeCallback,
  dismissible = true,
  backdrop = true,
  ...rest
}: Props) => {
  Swal.fire({
    confirmButtonText: positiveButton,
    showDenyButton: !!negativeButton,
    denyButtonText: negativeButton,
    allowOutsideClick: dismissible,
    ...rest,
  }).then((result) => {
    if (result.isConfirmed) positiveCallback?.();
    else negativeCallback?.();
  });
};

export const showSuccessAlert = (
  title: string,
  text: string,
  positiveButton = "Great",
  positiveCallback?: () => void
) => {
  showAlert({
    title,
    text,
    positiveButton,
    icon: SwalIcon.Success,
    positiveCallback,
  });
};

export const showErrorAlert = (
  title: string,
  text: string,
  positiveCallback?: () => void,
  positiveButton = "Yes"
) => {
  showAlert({
    title,
    text,
    icon: SwalIcon.Error,
    positiveCallback,
    positiveButton,
  });
};

export const showWarningAlert = (
  title: string,
  text: string,
  positiveCallback?: () => void,
  negativeButton = "No",
  positiveButton = "Yes"
) => {
  showAlert({
    title,
    text,
    icon: SwalIcon.Warning,
    negativeButton,
    positiveButton,
    positiveCallback,
  });
};

export const showInfoAlert = (title: string, text: string) => {
  showAlert({ title, text, icon: SwalIcon.Info });
};

export const showQuestionAlert = (
  title: string,
  text: string,
  positiveCallback?: () => void,
  positiveButton = "Yes",
  negativeButton = "No"
) => {
  showAlert({
    title,
    text,
    icon: SwalIcon.Question,
    negativeButton,
    positiveButton,
    positiveCallback,
  });
};

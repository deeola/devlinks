import { type Dispatch, type SetStateAction } from "react";

export interface TLogo {
  size: "small" | "large"
  className?: string
}

export interface TCustomize {
  id: string
  answer: string
  label: string
  bgColor: string
  image: string
  placeholder: string
  userId: string | undefined
}

export interface TLinks {
  id: string
  label: string
  answer: string
  image: string
  bgColor: string
}

export interface MergedValues {
  prompt: string
  answer: string
  label: string
  bgColor: string
  image: string
  id: string
  placeholder: string
  urlAddress: string
  timestamp: number
}

// export interface LinksState {
//   links:TLinks[];
// }

export interface TLinkState {
  links: MergedValues[]
}

export interface ILinks {
  links: TLinks[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined
}

export interface TNotification {
  id: string
  message: string
  type: "success" | "error" | "warning"
  timeout?: NodeJS.Timeout
}

export interface TNotificationState {
  notifications: TNotification[]
}

export interface TCustomizeWithError extends TCustomize {
  error: boolean
  errorMessage: string
}

export interface IPrompts extends TCustomize {
  error: boolean
  errorMessage: string
}

export interface Tdropdown {
  errorMessage: string
  error: boolean
  type: string
  handleOptionClick: (
    e: React.MouseEvent<HTMLLIElement>,
    i: number,
    label: string,
    image: string,
    placeholder: string,
    bgColor: string,
    id: string
  ) => void

  prompts: IPrompts[]
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => void
  handleDelete: (
    e: React.MouseEvent<HTMLButtonElement>,
    i: number,
    id: string,
    label: string
  ) => void
  handleButtonClick: (i: number) => void
  activeIndex: number | null
};

type Color = "active" | "secondary" | boolean;

export interface Buttons {
  text: string
  buttonType?: string
  backgroundSubtype?: Color
  classname?: string
  onClick?: () => void
  isDisabled?: boolean
  type?: "submit" | "button" | "reset"
  datatestid?: string
};

export interface UInputs {
  id: string
  name: string
  img?: string
  placeholder?: string
  type?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string | number
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  required?: boolean
  inputRef?: React.LegacyRef<HTMLInputElement> | undefined
  autoComplete?: string
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  error?: boolean | string
  errorMessage?: string
  passwordImg?: boolean
  handlePasswordClick?: () => void
  handlePasswordLeave?: () => void
  inputDataTestId?: string
  readOnly?: boolean
};

export interface Tnavbar {
  isShowProfile: boolean
  setIsShowProfile: (value: boolean) => void
};

export interface TText {
  text: string | undefined
  className?: string
}

export interface TTabs {
  text: string
  TabsType?: string
  default?: boolean
  img?: string
  links?: string
  onClick?: () => void
  classname?: string
};

export interface AuthData {
  auth: any
  setAuth: Dispatch<SetStateAction<any>>
  persist: boolean
  setPersist: Dispatch<SetStateAction<boolean>>
};

export interface userInfo {
  email: string
  firstName: string
  imgName: string
  lastName: string
};

export interface IProfileUserInfo {
  userInformation: userInfo | null
  userId: string
};

export interface TProps extends IProfileUserInfo {
  isPrompts: object[]
};

export interface TPhonePreviewProps extends TProps {
  profilePicture: string
  isPictureLoading: boolean
};

export type TLogo = {
  size: "small" | "large",
  className?: string
}

export interface TCustomize {
    id: string;
    answer: string;
    label: string;
    bgColor: string;
    image: string;
    placeholder: string;
    userId: string | undefined;
  }
  
  
  export interface TLinks {
    id: string;
    label: string;
    answer: string;
    image: string;
    bgColor: string;
  }

  export type MergedValues = { 
    prompt: string,
    answer: string,
    label: string,
    bgColor: string,
    image: string,
    id: string,
    placeholder: string,
    urlAddress: string,
    timestamp: number,
}
  

// export interface LinksState {
//   links:TLinks[];
// }

export type TLinkState = {
  links: MergedValues[];
}


export interface ILinks {
  links: TLinks[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | undefined;
}

export interface TNotification {
  id: string;
  message: string;
  type: "success" | "error" | "warning"; 
  timeout?: NodeJS.Timeout;
}


export interface TNotificationState {
  notifications: TNotification[];
}


export interface TCustomizeWithError extends TCustomize {
  error: boolean;
  errorMessage: string;
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

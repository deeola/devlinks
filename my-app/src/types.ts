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


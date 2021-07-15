import { FC, PropsWithChildren } from "react";

const ContentLeft: FC = (props: PropsWithChildren<any>) => {
  return (
    <>
      {props.children}
    </>
  )
}

export default ContentLeft

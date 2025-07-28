import { Input } from "@chakra-ui/react"

export const TextInput = ({changeFn, ...props}) => {
    return (
      <>
        <Input variant={"outline"} onChange={changeFn} {...props}></Input>
      </>
    );
};
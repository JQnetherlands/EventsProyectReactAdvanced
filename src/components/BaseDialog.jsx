import { Dialog, Portal, CloseButton } from "@chakra-ui/react";

export const BaseDialog = ({isOpen, onOpenChange, title, children, footer, size = "md"}) => {
    return (
        <Dialog.Root size={size} open={isOpen} onOpenChange={onOpenChange}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content borderRadius={"lg"} p={4}>
                        <Dialog.Header>
                            <Dialog.Title>
                                {title}
                            </Dialog.Title>
                        </Dialog.Header>

                        <Dialog.Body>{children}</Dialog.Body>

                        {footer && <Dialog.Footer>{footer}</Dialog.Footer>}

                        <Dialog.CloseTrigger asChild>
                            <CloseButton size={"sm"} />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}
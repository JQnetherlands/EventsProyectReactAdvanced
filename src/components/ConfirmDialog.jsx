import { Button, Text, useBreakpointValue } from "@chakra-ui/react";
import { BaseDialog } from "./BaseDialog";

export const ConfirmDialog = ({
    isOpen,
    setIsOpen,
    title = "Confirm",
    description,
    onConfirm,
    confirmLabel = "Confirm",
    confirmColor = "red",
}) => {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const dialogSize = isMobile ? "full" : "sm";

    const handleConfirm = async () => {
        await onConfirm();
        setIsOpen(false);
    };

    const buttons = (
        <>
            <Button variant={"ghost"} onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button colorPalette={confirmColor} onClick={handleConfirm}>
                {confirmLabel}
            </Button>
        </>
    );
    return (
        <BaseDialog
            isOpen={isOpen}
            onOpenChange={(e) => setIsOpen(e.open)}
            size={dialogSize}
            title={title}
            footer={buttons}
        >
            <Text>{description}</Text>
        </BaseDialog>
    )
}

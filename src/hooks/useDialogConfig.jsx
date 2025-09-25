/**
 * useDialogConfig.js
 * ------------------
 * A custom hook that standardizes dialog (modal) configuration
 * across the application. It helps maintain consistency for:
 *  - Dialog size (responsive: full screen on mobile, medium on desktop)
 *  - Dialog title (passed in from props)
 *  - Footer with Cancel & Save buttons (default labels + customizable)
 *
 * Parameters:
 *  - title (string): Dialog title text.
 *  - onSave (function): Called when the "Save" button is clicked.
 *  - onCancel (function): Called when the "Cancel" button is clicked.
 *  - saveLabel (string): Text for the save button (default: "Save").
 *  - cancelLabel (string): Text for the cancel button (default: "Cancel").
 *  - saveColor (string): Chakra color scheme for the save button (default: "teal").
 *
 * Returns:
 *  - size (string): The dialog size, responsive ("full" on mobile, "md" on desktop).
 *  - footer (JSX): Prebuilt footer with Cancel and Save buttons.
 *  - title (string): Pass-through of the dialog title for consistency.
 *
 * Example:
 * const { size, footer, title } = useDialogConfig({
 *   title: "Add Event",
 *   onSave: handleSave,
 *   onCancel: handleCancel,
 *   saveLabel: "Create",
 *   saveColor: "blue"
 * });
 *
 * <BaseDialog size={size} title={title} footer={footer} />
 */
import { useBreakpointValue, Button } from "@chakra-ui/react";
import { showToast } from "@/utils/showToast";
export function useDialogConfig({
  title,
  onSave,
  onCancel,
  saveLabel = "Save",
  cancelLabel = "Cancel",
  saveColor = "teal",
}) {
  // Responsive check: full-screen dialog on mobile, medium size on desktop
  const isMobile = useBreakpointValue({ base: true, md: false });
  const dialogSize = isMobile ? "full" : "md";

  // Standard footer with Cancel + Save buttons
  const footer = (
    <>
      {/* Cancel button - triggers toast + optional onCancel callback */}
      <Button
        variant="ghost"
        onClick={() => {
          showToast.cancel(); // Inform user that changes were cancelled
          onCancel?.(); // Execute custom cancel handler if provided
        }}
      >
        {cancelLabel}
      </Button>
      
      {/* Save button - executes provided onSave callback */}
      <Button colorPalette={saveColor} onClick={onSave}>
        {saveLabel}
      </Button>
    </>
  );

  return { size: dialogSize, footer, title };
}

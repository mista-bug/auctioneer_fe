import { AlertDialog, Button } from "@heroui/react";
import type { ReactNode } from "react";
import type React from "react";
import type { IAlertButton } from "../types/types";



const AlertButton:React.FC<IAlertButton> = ({body,id,onConfirm,variant,icon,label,status}) => {
    return (
        <AlertDialog key={status}>
          <Button className='' variant={variant}>{icon}{label}</Button>
          <AlertDialog.Backdrop>
            <AlertDialog.Container>
              <AlertDialog.Dialog className="sm:max-w-[400px]">
                <AlertDialog.CloseTrigger />
                <AlertDialog.Header>
                  <AlertDialog.Icon status="default" />
                  <AlertDialog.Heading>{label}</AlertDialog.Heading>
                </AlertDialog.Header>
                <AlertDialog.Body>
                  <p>{body}</p>
                </AlertDialog.Body>
                <AlertDialog.Footer>
                  <Button slot="close" variant="tertiary">
                    Cancel
                  </Button>
                  <Button slot="close" onClick={() => { onConfirm(id) }} variant={variant}>
                    Confirm
                  </Button>
                </AlertDialog.Footer>
              </AlertDialog.Dialog>
            </AlertDialog.Container>
          </AlertDialog.Backdrop>
        </AlertDialog>
    )
}

export default AlertButton;
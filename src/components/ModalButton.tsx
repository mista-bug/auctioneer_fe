import { Button, Modal } from "@heroui/react"
import React from "react"

interface IModalButton {
  triggerLabel?: string;
  triggerVariant?: "primary" | "secondary" | "ghost" | "destructive";
  icon?: React.ReactNode;
  heading?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string;
  placement?: "auto" | "center" | "top" | "bottom";
}

const ModalButton: React.FC<IModalButton> = ({
  triggerLabel = "Open Modal",
  icon,
  heading,
  description,
  children,
  footer,
  maxWidth = "sm:max-w-md",
  placement = "auto"
}) => {
  return (
    <Modal>
      <Button className='w-full' variant='secondary' >{icon} {triggerLabel}</Button>
      <Modal.Backdrop>
        <Modal.Container placement={placement}>
          <Modal.Dialog className={maxWidth}>
            <Modal.CloseTrigger />
            {(heading || description || icon) && (
              <Modal.Header className="flex flex-row items-center">
                {icon && (
                  <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                    {icon}
                  </Modal.Icon>
                )}
                {heading && <Modal.Heading>{heading}</Modal.Heading>}
                {description && (
                  <p className="mt-1.5 text-sm leading-5 text-muted">
                    {description}
                  </p>
                )}
              </Modal.Header>
            )}
            <Modal.Body className="p-6">
              {children}
            </Modal.Body>
            {footer && (
              <Modal.Footer>
                {footer}
              </Modal.Footer>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}

export default ModalButton;
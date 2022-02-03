declare module "*.svg" {
  const content: any;
  export default content;
}
declare module "*.scss" {
  const content: any;
  export default content;
}
declare module "*.pdf" {
  const content: any;
  export default content;
}
declare module "*.jpg" {
  const content: any;
  export default content;
}
declare module "*.png" {
  const content: any;
  export default content;
}
declare module "@welcome-ui/*" {
  import { ComponentType } from "react";
  const WuiProvider: ComponentType<any>;
  const createTheme: any;
  const Box: ComponentType<any>;
  const Button: ComponentType<any>;
  const Text: ComponentType<any>;
  const Modal: any;
  const useModalState: any;
  export { WuiProvider, createTheme, Box, Button, Text, Modal, useModalState };
}

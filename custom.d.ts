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
  const Pagination: ComponentType<any>;
  const Text: ComponentType<any>;
  const Accordion: ComponentType<any>;
  const Checkbox: ComponentType<any>;
  const Link: ComponentType<any>;
  const WriteIcon: ComponentType<any>;
  const LocationIcon: ComponentType<any>;
  const DateIcon: ComponentType<any>;
  const OfficeIcon: ComponentType<any>;
  const SearchIcon: ComponentType<any>;
  const Modal: any;
  const useModalState: any;
  const DropdownMenu: any;
  const useDropdownMenuState: any;

  export {
    WuiProvider,
    createTheme,
    Box,
    Button,
    Checkbox,
    Link,
    Pagination,
    Text,
    Modal,
    useModalState,
    DropdownMenu,
    useDropdownMenuState,
    WriteIcon,
    LocationIcon,
    DateIcon,
    OfficeIcon,
    SearchIcon,
    Accordion,
  };
}

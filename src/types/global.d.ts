// Global type declarations

// CSS Module declarations
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

// Additional global types can be added here

interface Window {
    initialReduxState: any
  }
  
declare interface ServiceWorkerConfig {
  onSuccess: (registration: ServiceWorkerRegistration) => void
  onUpdate: (registration: ServiceWorkerRegistration) => void
}

declare module "*.json" {
  const value: any;
  export default value;
}
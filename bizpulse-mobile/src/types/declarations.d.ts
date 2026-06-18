declare module 'expo-linear-gradient' {
  import { ComponentProps } from 'react'
  import { View } from 'react-native'

  export interface LinearGradientProps extends ComponentProps<typeof View> {
    colors: string[]
    start?: { x: number; y: number }
    end?: { x: number; y: number }
    locations?: number[]
  }

  export class LinearGradient extends React.Component<LinearGradientProps> {}
}

declare module '*.png' {
  const value: import('react-native').ImageSourcePropType
  export default value
}

declare module '*.jpg' {
  const value: import('react-native').ImageSourcePropType
  export default value
}

declare module '*.jpeg' {
  const value: import('react-native').ImageSourcePropType
  export default value
}

declare module '*.gif' {
  const value: import('react-native').ImageSourcePropType
  export default value
}

declare module '*.svg' {
  const content: string
  export default content
}

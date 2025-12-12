export interface ExampleProps {
  /**
   * The text to display
   */
  text?: string
}

/**
 * Example component - Replace this with your own components
 */
export const Example = ({ text = 'Hello World' }: ExampleProps) => {
  return <div>{text}</div>
}

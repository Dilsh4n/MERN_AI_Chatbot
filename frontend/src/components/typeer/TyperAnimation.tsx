import React from 'react'
import { TypeAnimation } from 'react-type-animation'

const TyperAnimation = () => {
  return (
    <TypeAnimation
    sequence={[
      // Same substring at the start will only be typed out once, initially
      'Chat with your own AI',
      1000, 
      'Chat with OpenAI GPT4.0-mini🛩️',
      1000,
      'Chat with Customized ChatGPT🍃',
      1000,
      'Chat with Custorm GPT🤖',
      1000
    ]}
    wrapper="span"
    speed={50}
    style={{ fontSize: '60px', color: 'orange', display:'inline-block', textShadow:'1px 1px 20px black' }}
    repeat={Infinity}
  />
  )
}

export default TyperAnimation
import React from 'react'

export default function Avatar({ src, name }) {
  return (
    <div className="flex -space-x-1">
        <img
          className="inline-block h-9 w-9 rounded-full"
          name={name}
          src={src}
        />
    </div>
  )
}

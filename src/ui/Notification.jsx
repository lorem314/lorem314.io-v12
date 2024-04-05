import React, { useReducer, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import styled from "styled-components"

import Timer from "./Timer"
import { RiCloseFill } from "@react-icons/all-files/ri/RiCloseFill"

const TYPE = { ADD: "ADD", REMOVE: "REMOVE", PAUSE: "PAUSE", TIME: "TIME" }

const manager = {
  subscribe(callback) {
    this.callback = callback
  },
  add(params) {
    this.callback(TYPE.ADD, params)
  },
  remove(id) {
    this.callback(TYPE.REMOVE, { id })
  },
  time(id) {
    this.callback(TYPE.TIME, { id })
  },
  pause(id) {
    this.callback(TYPE.PAUSE, { id })
  },
}

const reducer = (notifications = [], { type, ...rest }) => {
  switch (type) {
    case TYPE.ADD:
      return [...notifications, { id: Date.now(), ...rest }]
    case TYPE.REMOVE:
      return notifications.filter((n) => n.id !== rest.id)
    case TYPE.TIME:
      const idx1 = notifications.findIndex((n) => n.id === rest.id)
      if (idx1 !== -1) notifications[idx1].isTiming = true
      return [...notifications]
    case TYPE.PAUSE:
      const idx2 = notifications.findIndex((n) => n.id === rest.id)
      if (idx2 !== -1) notifications[idx2].isTiming = false
      return [...notifications]
    default:
      return notifications
  }
}

const Notification = () => {
  const [notifications, dispatch] = useReducer(reducer, [])

  useEffect(() => {
    const callback = (
      actionType,
      { id, varient, duration, title, body, isTiming }
    ) => {
      switch (actionType) {
        case TYPE.ADD:
          dispatch({
            type: actionType,
            varient,
            duration,
            title,
            body,
            isTiming,
          })
          break
        case TYPE.REMOVE:
          dispatch({ type: actionType, id })
          break
        case TYPE.TIME:
          dispatch({ type: actionType, id })
          break
        case TYPE.PAUSE:
          dispatch({ type: actionType, id })
          break
        default:
          break
      }
    }
    manager.subscribe(callback)
  }, [])

  return notifications.length !== 0
    ? createPortal(<List notifications={notifications} />, document.body)
    : null
}

export default Notification

export const showNotification = ({
  varient = "info",
  duration = 5000,
  title = "通知标题",
  body = "通知正文",
}) => {
  manager.add({ varient, duration, title, body, isTiming: true })
}

const ListWrapper = styled.ul`
  overflow-x: hidden;
  overflow-y: auto;

  list-style-type: none;
  margin: 0;
  padding: 10px;
  z-index: 100;

  position: absolute;
  top: 0;
  right: 0;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
`

const List = ({ notifications = [] }) => {
  return notifications.length === 0 ? null : (
    <ListWrapper>
      {notifications.map((notification) => {
        return <Item key={notification.id} notification={notification} />
      })}
    </ListWrapper>
  )
}

const ItemWrapper = styled.li`
  position: relative;
  border-radius: 0.25rem;
  min-width: 180px;
  max-width: 360px;

  transform: ${({ $offsetX }) => `translateX(${$offsetX}%)`};
  background-color: var(--content-bg);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

  transition: transform 500ms ease-in-out, color var(--theme-transition-props),
    background-color var(--theme-transition-props);

  > section {
    > header {
      padding: 4px 8px;
      background-color: rgba(0, 0, 0, 0.1);

      display: flex;
      justify-content: space-between;
      align-items: center;

      > h6 {
        font-size: 1rem;
        margin: 0;
      }

      > button {
        --svg-icon-size: 24px;
        padding: 0;
        border: none;
        border-radius: 50%;

        &:hover {
          > .svg-close {
            opacity: 1;
          }
        }

        > .svg-close {
          transform-origin: center center;
          transform: scale(0.8);
          opacity: 0.5;
        }

        > .ring {
          --svg-icon-size: 24px;
          position: absolute;
          > circle {
            fill: transparent;
            stroke: var(--primary-color);
          }
        }
      }
    }

    > p {
      padding: 4px 8px;
      margin: 0;
    }
  }
`

const Item = ({ notification }) => {
  const [offsetX, setOffsetX] = useState(110)

  useEffect(() => setOffsetX(0), [])

  const closeNotification = () => {
    Promise.resolve()
      .then(() => {
        return new Promise((resolve) => {
          setOffsetX(110)
          setTimeout(() => resolve(), 500)
        })
      })
      .then(() => manager.remove(notification.id))
  }

  const timeNotification = () => manager.time(notification.id)
  const pauseNotification = () => manager.pause(notification.id)

  return (
    <ItemWrapper
      $offsetX={offsetX}
      onMouseEnter={pauseNotification}
      onMouseLeave={timeNotification}
    >
      <section>
        <header>
          <h6>{notification.title}</h6>
          <button onClick={closeNotification}>
            <RiCloseFill className="svg-close" />
            <Timer
              duration={notification.duration}
              start={100}
              end={0}
              step={-1}
              isTiming={notification.isTiming}
              onTimeout={closeNotification}
            >
              {(time) => {
                const perimeter = Math.PI * (40 - 4)
                return (
                  <svg
                    className="ring"
                    viewBox="0 0 40 40"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="20"
                      cy="20"
                      r="18"
                      strokeWidth={4}
                      strokeDasharray={`${perimeter} ${perimeter}`}
                      strokeDashoffset={(time * perimeter) / 100}
                    />
                  </svg>
                )
              }}
            </Timer>
          </button>
        </header>
        <p>{notification.body}</p>
      </section>
    </ItemWrapper>
  )
}

import React from 'react'
import { Welcome, Question, Wheel, Answer } from "../views"

export const topics = [
    { id: 0, name: 'Topic 1', questions: [
        "What is this?",
        "What is that?",
        "Where would you find this?",
        "What does this taste like?",
        "Who has this?"
    ]},
    { id: 1, name: 'Topic 2', questions: [
        "What is this?",
        "What is that?",
        "Where would you find this?",
        "What does this taste like?",
        "Who has this?"
    ]},
    { id: 2, name: 'Topic 3', questions: [
        "What is this?",
        "What is that?",
        "Where would you find this?",
        "What does this taste like?",
        "Who has this?"
    ]}
]

const answers = [
    { id: 0, },
    { id: 1, },
    { id: 2, },
]

export const pages = [
    { id: 0, component: () => <Welcome /> },
    { id: 1, component: () => <Question topic={topics[0]} /> },
    { id: 2, component: () => <Question topic={topics[1]} /> },
    { id: 3, component: () => <Question topic={topics[2]} /> },
    { id: 4, component: () => <Wheel /> },
    { id: 5, component: () => <Answer topic={answers[0]} /> },
    { id: 6, component: () => <Answer topic={answers[1]} /> },
    { id: 7, component: () => <Answer topic={answers[2]} /> },
]

export const page = (state = pages[0], action) => {
    switch (action.type) {
        case 'NEXT':
            return state.id < 7 ? pages[state.id + 1] : state
        case 'PREVIOUS':
            return state.id > 0 ? pages[state.id - 1] : state
        default:
            return state
    }
}
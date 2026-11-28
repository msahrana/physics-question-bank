import { ICQQuestionItem, ICQResponsePart } from "@/interface"



// Reuse API response types
export type CQQuestion = ICQQuestionItem

export type CQPart = ICQResponsePart

// Component Props
export type CQStimulusProps = {
  stimulus?: unknown
  photoUrl?: string | null
  questionNo: number
}

export type CQQuestionPartsProps = {
  parts: CQPart[]
}

export type CQQuestionCardProps = {
  question: CQQuestion
  index: number
}

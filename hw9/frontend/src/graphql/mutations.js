import { gql } from "@apollo/client";

export const CREATE_CHATBOX_MUTATION = gql`
    mutation createChatBox($name1: String!, $name2: String!){
        createChatBox(name1: $name1, name2: $name2) {
            name
            messages {
                sender {
                    name
                }
                body
            }
        }
    }
`

export const CREATE_MESSAGE_MUTATION = gql`
    mutation createMessage($from: String!, $to: String!, $message: String!) {
        createMessage(from: $from, to: $to, content: $message) {
            sender {
                name
            }
            body
        }
    }
`
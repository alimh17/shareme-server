import {whiten} from '@chakra-ui/theme-tools'

export const ButtonStyles = {
    variants : {
        primary : (props : any) => ({
            bg : "primary",
            _hover : {
                bg : "secondary"
            }
        }
        )
    }
}
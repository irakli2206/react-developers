import Stripe from "stripe"


export const stripe = new Stripe('sk_test_51P6ZXCFtDuZ9TWJZjdaMzL1W77maw19YQFoSFygjcqR3VqTMIkKnaRr8Q0sKeEZ1uOVd6skIrlIZBmo3jj5BNj2500JmBR6bfG', {
    apiVersion: '2024-04-10',
    typescript: true
})
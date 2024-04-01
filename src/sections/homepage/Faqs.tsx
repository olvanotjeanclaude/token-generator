import { Accordion, AccordionDetails, AccordionSummary, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Title from './Title';

export default function Faqs() {
  const questions = [
    {
      question: "Can I trust your Solana tools product?",
      answer: "Yes, you can trust our Solana tools product. We are committed to providing reliable and secure solutions for token creation, minting, and authority management."
    },
    {
      question: "How do I use your Solana tools software?",
      answer: "To use our Solana tools software, simply follow the instructions provided on our platform. We offer user-friendly interfaces and comprehensive guides to help you navigate the token creation and management process."
    },
    {
      question: "What should I do if I encounter a problem during token creation or authority management?",
      answer: "If you encounter any issues while using our Solana tools product, please don't hesitate to contact our support team. We're here to assist you and ensure that you have a smooth experience with our platform."
    },
    {
      question: "How can I test your Solana tools without paying?",
      answer: "You can click the button in the top header to toggle between mainnet and devnet. This allows you to test our Solana tools in a development environment without making any payments."
    }
  ];


  return (
    <Stack>
      <Title title='Frequently Asked Questions' />

      <Stack gap={2}>
        {questions.map((item, index) => (
          <Accordion key={index} disableGutters>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant='h6' fontWeight={200}>{item.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{item.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </Stack>
  )
}

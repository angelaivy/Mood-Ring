import { describe, it, expect } from "vitest"
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import FormElement from "../components/form/FormElement"


describe('tests form elements', () => {
  it('should render radio input', () => {
    render(<FormElement type='input' id='happy' value='😀' />)
    const el = screen.getByRole('radio', { name: /happy/i })
    expect(el).toHaveAttribute('required')
    expect(el).toHaveAttribute('id', 'happy')
    expect(el).toHaveAttribute('value', '😀')
    const label = screen.getByText('😀')
    expect(label).toHaveAttribute('aria-label', 'happy')
    expect(label).toHaveAttribute('for', 'happy')
  })

  it('should render textarea', () => {
    render(<FormElement type='textarea' id='note' />)
    const el = screen.getByRole('textbox', { name: /note/i })
    expect(el).toHaveAttribute('id', 'note')
    const label = screen.getByText('Note:')
    expect(label).toHaveAttribute('for', 'note')
  })
})
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> calls the event handler with the right details', () => {
	const createNewBlog = jest.fn()

	const component = render(
		<BlogForm createNewBlog={createNewBlog} />
	)

	const titleInput = component.container.querySelector('#title')
	const authorInput = component.container.querySelector('#author')
	const urlInput = component.container.querySelector('#url')
	const form = component.container.querySelector('form')

	fireEvent.change(titleInput, {
		target: { value: 'testing forms' }
	})
	fireEvent.change(authorInput, {
		target: { value: 'tester' }
	})
	fireEvent.change(urlInput, {
		target: { value: 'tests.com' }
	})
	fireEvent.submit(form)

	expect(createNewBlog.mock.calls).toHaveLength(1)
	expect(createNewBlog.mock.calls[0][0].title).toBe('testing forms')
	expect(createNewBlog.mock.calls[0][0].author).toBe('tester')
	expect(createNewBlog.mock.calls[0][0].url).toBe('tests.com')
})
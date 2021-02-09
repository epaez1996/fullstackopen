import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
	let component
	const mockHandler = jest.fn()

	const blog = {
		title: 'test title',
		author: 'tester',
		likes: 0,
		url: 'test.com',
		user: {
			name: 'testly'
		}
	}

	beforeEach(() => {
		component = render(
			<Blog blog={blog} updateBlog={mockHandler}/>
		)
	})

	test('renders blog title and blog author only', () => {
		expect(component.container).not.toHaveTextContent('test.com')
	})

	test('renders blog url and blog likes when view button clicked', () => {
		const button = component.getByText('view')
		fireEvent.click(button)

		expect(component.container).toHaveTextContent('test.com 0')

	})

	test('clicking the like button twice, calls the event handler twice', () => {
		const button = component.getByText('view')
		fireEvent.click(button)

		const likeButton = component.getByText('like')
		fireEvent.click(likeButton)
		fireEvent.click(likeButton)

		expect(mockHandler.mock.calls).toHaveLength(2)

	})
})






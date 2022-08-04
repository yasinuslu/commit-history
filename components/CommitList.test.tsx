import { render, screen } from '@testing-library/react';
import { GithubCommitResponse } from '../lib/types';
import CommitList from './CommitList';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

jest.mock('../hooks/useCurrentTime', () => ({
  __esModule: true,
  default: () => new Date('2020-01-01T10:00:00.000Z'),
}));

describe('CommitList', () => {
  it('test', () => {
    expect(true).toBe(true);
  });

  it('should render without crashing', () => {
    const { container } = render(<CommitList commits={[]} />);
    expect(container).toBeInTheDocument();
  });

  it('should render commits as expected', () => {
    render(
      <CommitList
        commits={
          [
            {
              html_url: 'test-html-url',
              commit: {
                message: 'test-message',
                author: {
                  name: 'test-name',
                  date: '2020-01-01T00:00:00Z',
                },
              },
              author: {
                login: 'test-login',
                avatar_url: 'http://example.com/avatar.jpg',
              },
            },
          ] as GithubCommitResponse[]
        }
      />,
    );

    expect(screen.getByLabelText('View commit on Github')).toBeInTheDocument();
    expect(screen.getByLabelText('View commit on Github')).toHaveAttribute(
      'href',
      'test-html-url',
    );
    expect(screen.getByLabelText('View commit on Github')).toHaveTextContent(
      'test-message',
    );

    expect(screen.getByLabelText('Author avatar')).toBeInTheDocument();
    expect(screen.getByLabelText('Author avatar')).toHaveAttribute(
      'src',
      'http://example.com/avatar.jpg',
    );
    expect(screen.getByLabelText('Author avatar')).toHaveAttribute(
      'alt',
      'test-name',
    );

    expect(screen.getByLabelText('Author handle')).toBeInTheDocument();
    expect(screen.getByLabelText('Author handle')).toHaveTextContent(
      '@test-login',
    );

    expect(screen.getByLabelText('Commit date')).toBeInTheDocument();
    expect(screen.getByLabelText('Commit date')).toHaveTextContent(
      'about 10 hours ago',
    );
  });
});

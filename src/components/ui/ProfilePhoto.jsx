const profilePhotoSrc = '/p_icon.jpeg'

export function ProfilePhoto({ variant = 'portrait', alt = 'Parvez Siddiqui', className = '', loading = 'lazy', fetchPriority, decoding = 'async' }) {
  return (
    <img
      className={`profile-photo profile-photo--${variant}${className ? ` ${className}` : ''}`}
      src={profilePhotoSrc}
      alt={alt}
      width="300"
      height="300"
      loading={loading}
      fetchPriority={fetchPriority}
      decoding={decoding}
    />
  )
}

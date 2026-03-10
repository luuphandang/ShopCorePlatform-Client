export enum EJsonldType {
  // Creative Works
  ARTICLE = 'Article', // for blog posts, news articles
  NEW_ARTICLE = 'NewsArticle', // for news content
  BLOG_POSTING = 'BlogPosting', // for blog posts
  CREATIVE_WORK = 'CreativeWork', // a general category for anything creative
  BOOK = 'Book', // for books
  MOVIE = 'Movie', // for movies
  MUSIC_RECORDING = 'MusicRecording', // for songs or audio
  RECIPE = 'Recipe', // for cooking recipes
  REVIEW = 'Review', // for reviews
  VIDEO_OBJECT = 'VideoObject', // for videos
  PODCAST_EPISODE = 'PodcastEpisode', // for podcast content

  // Products & Offers
  PRODUCT = 'Product', // for a product
  OFFER = 'Offer', // for price and availability of a product/service
  AGGREGATE_OFFER = 'AggregateOffer', // multiple offers for a product
  AGGREGATE_RATING = 'AggregateRating', // average rating from multiple users
  RATING = 'Rating', // rating from user
  BRAND = 'Brand', // brand of a product
  SERVICE = 'Service', // for services offered

  // People & Organizations
  PERSON = 'Person', // for an individual
  ORGANIZATION = 'Organization', // for a business or group
  LOCAL_BUSINESS = 'LocalBusiness', // for a local business (can be specialized, e.g., "Restaurant", "Store", etc.)
  CORPORATION = 'Corporation', // for a company

  // Location & Events
  PLACE = 'Place', // general location
  POSTAL_ADDRESS = 'PostalAddress', // address details
  EVENT = 'Event', // any event
  MUSIC_EVENT = 'MusicEvent', // music-specific event
  FESTIVAL = 'Festival', // festivals
  SPORTS_EVENT = 'SportsEvent', // sports events

  // Web Pages
  WEBSITE = 'WebSite', // for the entire website
  WEB_PAGE = 'WebPage', // a single page
  COLLECTION_PAGE = 'CollectionPage', // a list or category page
  SEARCH_RESULTS_PAGE = 'SearchResultsPage', // page with search results
  FAQ_PAGE = 'FAQPage', // page containing FAQs
  PROFILE_PAGE = 'ProfilePage', // page for a person or organization

  // Transactions & Organizations
  INVOICE = 'Invoice', // billing data
  ORDER = 'Order', // purchase order
  CONTACT_POINT = 'ContactPoint', // contact information
  OPENING_HOURS_SPECIFICATION = 'OpeningHoursSpecification', // hours of operation

  // Technical / Miscellaneous
  BREADCRUMB_LIST = 'BreadcrumbList', // for breadcrumb navigation
  LIST_ITEM = 'ListItem', // used inside a BreadcrumbList
  IMAGE_OBJECT = 'ImageObject', // image metadata
  THING = 'Thing', // base type for anything (used when unsure)
}

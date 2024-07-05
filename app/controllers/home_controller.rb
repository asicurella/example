# frozen_string_literal: true

class HomeController < StoreController
  helper 'spree/products'
  respond_to :html
  def index
    @basic_bundle_taxon = Spree::Taxon.find_by(permalink: 'categories/basic-bundle')
    @searcher = build_searcher(params.merge(include_images: true))
    @products = @searcher.retrieve_products
    @taxonomies = Spree::Taxonomy.includes(root: :children)
    @french_tip_taxon = Spree::Taxon.find_by(permalink: 'categories/french-tips')
    
    
    if @basic_bundle_taxon
      basic_bundle_searcher = build_searcher(params.merge(include_images: true, taxon: @basic_bundle_taxon.id))
      @french_tip_products = basic_bundle_searcher.retrieve_products
    else
      @french_tip_products = []
    end

    if @french_tip_taxon
      french_tip_searcher = build_searcher(params.merge(include_images: true, taxon: @french_tip_taxon.id))
      @french_tip_products = french_tip_searcher.retrieve_products
    else
      @french_tip_products = []
    end


    @searcher = build_searcher(params.merge(include_images: true))
    @products = @searcher.retrieve_products


    # Split products into groups of 3 for the homepage blocks.
    # You probably want to remove this logic and use your own!
    homepage_groups = @products.in_groups_of(3, false)
    @featured_products = homepage_groups[0]
    @collection_products = homepage_groups[1]
    @cta_collection_products = homepage_groups[2]
    @new_arrivals = homepage_groups[3]
  end
end

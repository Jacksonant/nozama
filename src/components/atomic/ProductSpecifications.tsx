import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Package, Settings, Wrench } from "lucide-react";

/**
 * Another hardcoded component to fill space.
 */
export default function ProductSpecifications() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Detailed Specifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-muted-foreground">
          This premium product features advanced technology and superior
          craftsmanship. Each item is carefully manufactured to meet the highest
          quality standards.
        </p>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            Key Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Premium materials for long-lasting durability",
              "Advanced engineering for optimal performance",
              "Ergonomic design for maximum comfort",
              "Easy maintenance and care instructions",
              "Backed by comprehensive warranty",
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Wrench className="w-4 h-4" />
            Technical Details
          </h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              Our products undergo rigorous testing to ensure they meet
              international quality standards. The manufacturing process
              incorporates cutting-edge technology and sustainable practices.
            </p>
            <p>
              Each product comes with detailed instructions and customer support
              to ensure you get the most out of your purchase. Our team is
              committed to providing exceptional service and support.
            </p>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Package className="w-4 h-4" />
            Care Instructions
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              To maintain the quality and appearance of your product, please
              follow the care instructions provided. Regular maintenance will
              ensure optimal performance and extend the product&apos;s lifespan.
            </p>
            <p>
              For any questions or concerns, our customer service team is
              available to assist you. We stand behind our products and are
              committed to your satisfaction.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

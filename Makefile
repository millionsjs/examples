EXAMPLES = hello-millions/index.html hello-millions/index.js hello-millions/index.css

BROWSERIFY = node_modules/.bin/browserify
BFLAGS = -t [ babelify --presets [ es2015 react ] ]

all: $(addprefix build/dist/,$(EXAMPLES))

clean:
	rm -rf build

# browserify can't generate deps and output files at the same time, so we have to
# do two separate bundles (one to actually bundle and one to get deps)
build/dist/%.js: src/%.js
	@echo "bundle " $<
	@mkdir -p $(dir $@) build/deps/$(dir $*)
	@$(BROWSERIFY) $< -o $@ $(BFLAGS)
	@$(BROWSERIFY) $< -o $@ $(BFLAGS) --list | node makedeps.js $@ > build/deps/$*.js.d

# include the generated deps so that changes to dependent files trigger rebuilds
-include $(addsuffix .d,$(addprefix build/deps/,$(EXAMPLES)))

# anything not covered before this is just a simple copy
build/dist/%: src/%
	@echo "copy   " $<
	@mkdir -p $(dir $@)
	@cp $< $@
